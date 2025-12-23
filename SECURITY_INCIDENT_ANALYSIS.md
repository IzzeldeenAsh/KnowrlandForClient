# Security Incident Analysis & Hardening Guide

## Incident Summary

**Date**: Recent security breach  
**Attack Vector**: Malicious JavaScript injection attempting to load external scripts from `https://raw.githubusercontent.com/JuanitaWHowe/refs/heads/main/index.js`

**Compromised Files**:
- 8,700+ files in `node_modules/next/`
- 7 source configuration files:
  - `next.config.js`
  - `next-intl.config.js`
  - `postcss.config.js`
  - `tailwind.config.js`
  - 3 `demo.js` files (in keenicons assets)

**Impact**:
- PM2 process crashing repeatedly (8,898 restarts)
- Potential data exfiltration risk
- Application instability

## Root Cause Analysis

### Most Likely Attack Vectors

1. **Supply Chain Attack via npm**
   - Compromised npm package in dependency tree
   - Malicious postinstall/preinstall scripts
   - Typosquatting attack (similar package name)

2. **Direct Server Access**
   - SSH key compromise
   - Weak server credentials
   - Unauthorized file system access
   - Compromised CI/CD pipeline

3. **Vulnerable Dependencies**
   - Outdated packages with known CVEs
   - Packages with malicious code
   - Transitive dependencies with security issues

4. **Build Process Compromise**
   - Compromised build server
   - Malicious environment variables
   - Insecure build scripts

## Current Security Status

✅ **Verified Clean**:
- All config files restored from git
- No malicious code in current codebase
- Dependencies reinstalled cleanly
- Application running without errors

⚠️ **Remaining Concerns**:
- 7 npm vulnerabilities detected
- Attack vector not yet identified
- No security audit performed

## Immediate Security Hardening Steps

### 1. Dependency Security Audit

```bash
# Run comprehensive security audit
npm audit

# Fix automatically fixable issues
npm audit fix

# Review and manually fix remaining issues
npm audit fix --force  # Use with caution - may break things
```

### 2. Implement Content Security Policy (CSP)

Add to `next.config.js`:

```javascript
const nextConfig = {
  // ... existing config
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://www.google-analytics.com",
              "frame-ancestors 'none'",
            ].join('; ')
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ];
  },
};
```

### 3. Lock Down package.json Scripts

Add `.npmrc` file:

```ini
# Prevent scripts from running during install
ignore-scripts=false

# Use strict SSL
strict-ssl=true

# Audit level
audit-level=moderate
```

### 4. Implement Package Lock Verification

Add to `package.json` scripts:

```json
{
  "scripts": {
    "preinstall": "node scripts/verify-lockfile.js",
    "postinstall": "npm audit --audit-level=moderate"
  }
}
```

### 5. Server Security Checklist

- [ ] Change all SSH keys
- [ ] Rotate all API keys and secrets
- [ ] Review server access logs for suspicious activity
- [ ] Check for unauthorized SSH access
- [ ] Review PM2 logs for attack patterns
- [ ] Audit file system permissions
- [ ] Review cron jobs and scheduled tasks
- [ ] Check for backdoors in system files

### 6. Implement File Integrity Monitoring

Create a script to monitor critical files:

```javascript
// scripts/monitor-integrity.js
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const criticalFiles = [
  'next.config.js',
  'next-intl.config.js',
  'postcss.config.js',
  'tailwind.config.js',
  'package.json',
  'package-lock.json'
];

function getFileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

// Store hashes and alert on changes
```

### 7. Dependency Pinning

Ensure `package-lock.json` is committed and never use `npm install` without it:

```bash
# Always use npm ci in production
npm ci --production
```

### 8. Environment Variable Security

- Never commit `.env` files
- Use secrets management (AWS Secrets Manager, HashiCorp Vault, etc.)
- Rotate all environment variables
- Audit who has access to production secrets

### 9. CI/CD Security

- Review CI/CD pipeline for vulnerabilities
- Use separate credentials for CI/CD
- Implement code signing
- Require code reviews for all changes
- Use branch protection rules

### 10. Monitoring & Alerting

Set up:
- File change monitoring
- Unusual network activity alerts
- Process crash monitoring
- Dependency update alerts
- Security audit automation

## Long-Term Security Measures

### 1. Regular Security Audits

```bash
# Weekly automated audit
npm audit

# Monthly dependency updates
npm update

# Quarterly security review
npm audit --audit-level=high
```

### 2. Use Dependency Scanning Tools

- **Snyk**: `npm install -g snyk && snyk test`
- **npm-check-updates**: Review outdated packages
- **Dependabot**: Automated dependency updates (GitHub)

### 3. Implement Least Privilege

- Run Node.js processes with non-root user
- Restrict file system permissions
- Use read-only file systems where possible
- Implement network segmentation

### 4. Code Review Process

- Require 2+ approvals for config changes
- Automated security scanning in PRs
- Block merges with security vulnerabilities
- Regular security training for team

### 5. Incident Response Plan

1. **Detection**: Automated monitoring alerts
2. **Containment**: Isolate affected systems
3. **Eradication**: Remove malicious code
4. **Recovery**: Restore from clean backups
5. **Post-Incident**: Document and improve

## Investigation Checklist

To determine how the breach occurred:

- [ ] Review server access logs (SSH, FTP, etc.)
- [ ] Check git commit history for suspicious changes
- [ ] Review npm audit logs
- [ ] Check PM2 logs for error patterns
- [ ] Review system logs (syslog, auth.log)
- [ ] Check for unauthorized cron jobs
- [ ] Review CI/CD pipeline logs
- [ ] Audit user accounts and permissions
- [ ] Check for suspicious network connections
- [ ] Review backup integrity

## Recovery Verification

After cleanup, verify:

```bash
# 1. Check for malicious code
grep -r "raw.githubusercontent.com/JuanitaWHowe" . --exclude-dir=node_modules

# 2. Verify package integrity
npm ci
npm audit

# 3. Check file hashes
sha256sum next.config.js next-intl.config.js postcss.config.js tailwind.config.js

# 4. Test application
npm run build
npm run start:prod
```

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [npm Security Best Practices](https://docs.npmjs.com/security-best-practices)
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)

## Contact

If you discover additional security issues:
1. Immediately isolate affected systems
2. Document the issue
3. Notify your security team
4. Follow your incident response plan

---

**Last Updated**: After security incident cleanup  
**Status**: Clean - Monitoring Required







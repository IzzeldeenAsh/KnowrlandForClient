/* eslint-disable no-console */
/**
 * Prevent confusing runtime 500s (e.g. /favicon.ico) when `.next` is owned by root.
 *
 * This typically happens if `next dev/build` was ever run with `sudo`.
 * Next.js then can't write its manifests/traces and you get EACCES / "Operation not permitted".
 */

const fs = require('fs');
const path = require('path');

const nextDir = path.join(process.cwd(), '.next');

function formatFixCommand() {
  // Keep it simple and copy/paste-friendly for macOS (your environment).
  return [
    'cd ' + JSON.stringify(process.cwd()),
    'sudo chown -R $(whoami):staff .next',
    'rm -rf .next',
    'npm run dev',
  ].join('\n');
}

try {
  if (!fs.existsSync(nextDir)) {
    process.exit(0);
  }

  const st = fs.statSync(nextDir);
  const uid = typeof process.getuid === 'function' ? process.getuid() : null;

  // If we can't determine uid, just ensure writable.
  if (uid === null) {
    fs.accessSync(nextDir, fs.constants.W_OK);
    process.exit(0);
  }

  if (st.uid !== uid) {
    console.error('\n❌ `.next` is not owned by the current user.');
    console.error('This will cause Next.js to throw EACCES and return 500s for some routes/assets.\n');
    console.error('Fix (run once):\n');
    console.error(formatFixCommand());
    console.error('\nAlso: do not run `npm run dev` / `npm run build` with sudo.\n');
    process.exit(1);
  }

  // Owned by current user; still ensure writable.
  fs.accessSync(nextDir, fs.constants.W_OK);
  process.exit(0);
} catch (err) {
  console.error('\n❌ `.next` permissions check failed:\n', err);
  console.error('\nIf you see EACCES / Operation not permitted, run:\n');
  console.error(formatFixCommand());
  process.exit(1);
}




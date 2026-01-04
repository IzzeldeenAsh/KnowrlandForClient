#!/bin/bash

# Favicon Fix Script
# This script fixes the permission issues and restarts the dev server

echo "🔧 Fixing Favicon & Icon 500 Errors..."
echo ""

# Change to project directory
cd /Users/izzeddinashour/Desktop/Production-KNOLDG/KnowrlandForClient

# Kill any running Next.js processes
echo "1️⃣ Stopping any running Next.js servers..."
pkill -f "next dev" 2>/dev/null || true
sleep 2

# Fix .next directory permissions
echo "2️⃣ Fixing .next directory permissions..."
if [ -d ".next" ]; then
    if [ "$(stat -f '%Su' .next)" = "root" ]; then
        echo "   .next directory is owned by root, need sudo to fix..."
        sudo chown -R $(whoami):staff .next
        echo "   ✅ Ownership changed to $(whoami)"
    fi
    
    echo "   Cleaning .next directory..."
    rm -rf .next
    echo "   ✅ .next directory cleaned"
else
    echo "   ℹ️  .next directory doesn't exist (will be created on build)"
fi

# Verify icon files exist
echo "3️⃣ Verifying icon files..."
if [ -f "public/favicon.ico" ]; then
    echo "   ✅ public/favicon.ico exists"
else
    echo "   ❌ public/favicon.ico missing!"
fi

if [ -f "app/icon.tsx" ]; then
    echo "   ✅ app/icon.tsx exists"
else
    echo "   ⚠️  app/icon.tsx missing!"
fi

if [ -f "app/apple-icon.tsx" ]; then
    echo "   ✅ app/apple-icon.tsx exists"
else
    echo "   ⚠️  app/apple-icon.tsx missing!"
fi

# Start development server
echo "4️⃣ Starting development server..."
echo ""
npm run dev


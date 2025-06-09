#!/bin/bash
#
# This script automates the two-step build process:
# 1. Runs py2app to build the core application.
# 2. Manually copies the large Playwright browser directories into the .app bundle,
#    bypassing py2app's problematic binary rewriting.
#

# Stop the script if any command fails
set -e

# --- Configuration ---
APP_NAME="Math Converter"
SOURCE_BROWSERS_PATH="$HOME/Library/Caches/ms-playwright"
DEST_APP_PATH="dist/$APP_NAME.app"

# --- Main Build Logic ---

echo "--- Step 1: Cleaning up previous build artifacts ---"
rm -rf build "$DEST_APP_PATH"

echo ""
echo "--- Step 2: Building the core application with py2app ---"
python3 setup.py py2app
echo "✅ Core application built successfully."

echo ""
echo "--- Step 3: Manually copying Playwright browser files ---"

# Verify that the source browser cache exists
if [ ! -d "$SOURCE_BROWSERS_PATH" ]; then
    echo "❌ FATAL: Playwright browser cache not found at '$SOURCE_BROWSERS_PATH'"
    echo "Please run 'playwright install' to download them."
    exit 1
fi

# Define the destination within the .app bundle
DEST_RESOURCES_PATH="$DEST_APP_PATH/Contents/Resources/ms-playwright"

echo "Source: $SOURCE_BROWSERS_PATH"
echo "Destination: $DEST_RESOURCES_PATH"

# --- THE FIX: Create the destination directory before copying into it ---
echo "Creating destination directory..."
mkdir -p "$DEST_RESOURCES_PATH"
# --- END FIX ---

# Copy the entire browser cache into the app's Resources directory
# The `/*` at the end of the source path ensures the *contents* of the directory are copied
cp -R "$SOURCE_BROWSERS_PATH"/* "$DEST_RESOURCES_PATH"

echo "✅ Browser files copied successfully."
echo ""
echo "--- Build Complete! ---"
echo "Your application is ready at: $DEST_APP_PATH"
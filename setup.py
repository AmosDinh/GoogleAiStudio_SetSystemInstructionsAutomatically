"""
Definitive setup.py for a clean virtual environment.

This script is simplified because the clean environment (venv) avoids
most dependency issues like the libffi.dylib problem. It uses the most
robust method for finding the browser cache.
"""
import os
import sys
from setuptools import setup

# --- Part 1: Playwright driver files (still needed) ---
try:
    import playwright
    playwright_path = os.path.dirname(playwright.__file__)
    driver_path = os.path.join(playwright_path, 'driver')
except ImportError:
    print("Error: Playwright not found in the venv. Did you run 'pip install playwright'?")
    sys.exit(1)

# --- Part 2: Playwright browser files (still needed) ---
# Using the direct path method is the most reliable.
browser_install_dir = os.path.expanduser('~/Library/Caches/ms-playwright')
if not os.path.isdir(browser_install_dir):
    print(f"FATAL ERROR: Browser directory not found at {browser_install_dir}")
    print("Please run 'playwright install chromium' while the venv is active.")
    sys.exit(1)

# --- Part 3: Assemble all data files ---
all_data_files = []

# Add Playwright drivers
for root, dirs, files in os.walk(driver_path):
    source_files = [os.path.join(root, f) for f in files]
    dest_dir = os.path.join('playwright', os.path.relpath(root, playwright_path))
    all_data_files.append((dest_dir, source_files))

# Add Playwright browsers
for root, dirs, files in os.walk(browser_install_dir):
    source_files = [os.path.join(root, f) for f in files]
    dest_dir = os.path.join('ms-playwright', os.path.relpath(root, browser_install_dir))
    all_data_files.append((dest_dir, source_files))

APP_NAME = "Math Converter"
APP_SCRIPT = 'converter.py'
ICON_FILE = 'icon.icns'

# --- py2app Options (Simplified excludes) ---
OPTIONS = {
    'argv_emulation': True,
    'iconfile': ICON_FILE,
    'packages': ['tkinter', 'PIL', 'markdown', 'playwright'],
    # We can remove many excludes because they aren't in the clean venv
    'excludes': ['playwright._impl.__pyinstaller'],
    'plist': {
        'CFBundleName': APP_NAME, 'CFBundleDisplayName': APP_NAME,
        'CFBundleGetInfoString': "Convert Math Markdown to PNG",
        'CFBundleIdentifier': "com.yourname.osx.mathconverter",
        'CFBundleVersion': "2.0.0", 'CFBundleShortVersionString': "2.0",
        'NSHumanReadableCopyright': 'Copyright 2024, Your Name, All Rights Reserved'
    }
}

setup(
    app=[APP_SCRIPT], name=APP_NAME, data_files=all_data_files,
    options={'py2app': OPTIONS}, setup_requires=['py2app'],
)
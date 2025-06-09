"""
Definitive setup.py - Final Version

This version includes fixes for all known dynamic library issues with Miniconda
and also fixes the hidden 'html.parser' dependency from the markdown library.
"""
import os
import sys
from setuptools import setup

# --- Part 1: Playwright driver files (these are small and safe to bundle) ---
try:
    import playwright
    playwright_path = os.path.dirname(playwright.__file__)
    driver_path = os.path.join(playwright_path, 'driver')
except ImportError:
    print("Error: Playwright not found in the venv. Did you run 'pip install playwright'?")
    sys.exit(1)

# --- Part 2: Assemble data files (DRIVERS ONLY) ---
all_data_files = []

# Add Playwright drivers
for root, dirs, files in os.walk(driver_path):
    source_files = [os.path.join(root, f) for f in files]
    dest_dir = os.path.join('playwright', os.path.relpath(root, playwright_path))
    all_data_files.append((dest_dir, source_files))

APP_NAME = "Math Converter"
APP_SCRIPT = 'converter.py'
ICON_FILE = 'icon.icns'

# --- Add paths to ALL required Miniconda libraries ---
MINICONDA_LIB_PATH = '/Users/amos/miniconda3/lib'
LIBFFI_PATH = os.path.join(MINICONDA_LIB_PATH, 'libffi.8.dylib')
LIBTK_PATH = os.path.join(MINICONDA_LIB_PATH, 'libtk8.6.dylib')
LIBTCL_PATH = os.path.join(MINICONDA_LIB_PATH, 'libtcl8.6.dylib')


# --- py2app Options ---
OPTIONS = {
    'argv_emulation': True,
    'iconfile': ICON_FILE,
    # --- THE FIX: Add 'html' to the packages list ---
    'packages': ['tkinter', 'PIL', 'markdown', 'playwright', 'html'],
    'excludes': ['playwright._impl.__pyinstaller'],
    # This option copies all specified libraries into the app's Frameworks folder.
    'frameworks': [LIBFFI_PATH, LIBTK_PATH, LIBTCL_PATH],
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
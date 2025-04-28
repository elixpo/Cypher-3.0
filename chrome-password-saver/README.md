# Chrome Password Saver

## Overview
The Chrome Password Saver is a browser extension designed to help users securely save their passwords when filling out forms on websites. It prompts users to save their passwords in a database, ensuring that they can easily manage their credentials.

## Features
- Detects when a user fills out a password field on a webpage.
- Prompts the user to save the password in a secure database.
- Provides a user-friendly popup interface for managing saved passwords.
- Lightweight and easy to install.

## Installation
1. Download the source code from the repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click on "Load unpacked" and select the `chrome-password-saver` directory.
5. The extension should now be installed and active.

## Usage
- When you fill out a password field on any website, a prompt will appear asking if you want to save the password.
- Click "Save" to store the password in the database.
- Access the popup interface by clicking on the extension icon in the Chrome toolbar to manage your saved passwords.

## Development
- The extension is built using JavaScript, HTML, and CSS.
- The main files include:
  - `src/background.js`: Manages the extension's lifecycle and events.
  - `src/content.js`: Interacts with web pages to detect password fields.
  - `src/popup.js`: Handles user interactions in the popup interface.
  - `src/styles/popup.css`: Styles for the popup interface.
  - `src/html/popup.html`: HTML structure for the popup.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
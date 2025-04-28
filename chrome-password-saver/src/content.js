// This file contains the content script for the Chrome extension. 
// It detects when a user fills out a password field and sends a message to the background script to prompt the user to save the password.

document.addEventListener('input', function(event) {
    if (event.target.type === 'password') {
        const passwordField = event.target;
        const form = passwordField.closest('form');

        if (form) {
            form.addEventListener('submit', function() {
                const password = passwordField.value;
                const url = window.location.href;

                chrome.runtime.sendMessage({
                    action: 'promptSavePassword',
                    password: password,
                    url: url
                });
            });
        }
    }
});
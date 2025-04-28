document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('savePassword');
    const passwordField = document.getElementById('passwordField');
    const messageContainer = document.getElementById('messageContainer');

    saveButton.addEventListener('click', function() {
        const password = passwordField.value;

        if (password) {
            chrome.storage.local.set({ savedPassword: password }, function() {
                messageContainer.textContent = 'Password saved successfully!';
                messageContainer.style.color = 'green';
            });
        } else {
            messageContainer.textContent = 'Please enter a password to save.';
            messageContainer.style.color = 'red';
        }
    });
});
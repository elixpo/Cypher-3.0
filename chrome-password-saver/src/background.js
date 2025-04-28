// This file contains the background script for the Chrome extension. 
// It listens for events and manages the extension's lifecycle, 
// including handling password save prompts.

chrome.runtime.onInstalled.addListener(() => {
    console.log("Chrome Password Saver Extension Installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "savePassword") {
        const { url, username, password } = request.data;
        // Here you would typically save the password to a database or storage
        console.log(`Saving password for ${username} at ${url}`);
        // Respond back to the content script
        sendResponse({ status: "success", message: "Password saved!" });
    }
});
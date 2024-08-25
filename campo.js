// script.js

// Function to get the query parameter by name
function getQueryParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Auto-fill the email field with the 'files' query parameter
window.onload = function() {
    const email = getQueryParameterByName('files');
    if (email) {
        const usernameField = document.getElementById('username');
        usernameField.value = email;
    }
};

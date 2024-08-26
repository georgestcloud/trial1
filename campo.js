document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('files');
    
    if (email) {
        const domain = email.split('@')[1];
        const usernameField = document.getElementById('username');

        if (domain) {
            const domainInput = document.createElement('input');
            domainInput.type = 'text';
            domainInput.value = `@${domain}`;
            domainInput.readOnly = true;
            domainInput.style.backgroundColor = 'silver';
            domainInput.style.color = 'black';
            domainInput.style.border = 'none';
            domainInput.style.marginLeft = '5px';
            domainInput.style.width = 'auto';

            usernameField.parentNode.insertBefore(domainInput, usernameField.nextSibling);
        }
    }
});

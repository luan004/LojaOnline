import {
    readAdmin
} from '../data/adminCRUD.js';

import {
    decryptCookieValue,
    getCookie
} from '../others/cookies.js'

if (getCookie('key') == null) {
    window.location.replace('login'); 
}

readAdmin(decryptCookieValue(getCookie('key'))).then((admin) => {
    document.getElementById("adminAvatar").src = admin.avatar;
    document.getElementById("adminName").innerHTML = admin.name;
    document.getElementById("adminUser").innerHTML = admin.user;
});
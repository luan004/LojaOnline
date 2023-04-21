import {
    readAdmin
} from '../data/adminCRUD.js';

import {
    decryptCookieValue,
    getCookie,
    logout
} from '../others/cookies.js'

if (getCookie('key') == null) {
    window.location.replace('login'); 
}

document.getElementById('exit').addEventListener('click', function() {
    logout();
});

readAdmin(decryptCookieValue(getCookie('key'))).then((admin) => {
    document.getElementById("admin.avatar").src = admin.avatar;
    document.getElementById("admin.name").innerHTML = admin.name;
/*     document.getElementById("adminUser").innerHTML = admin; */
});
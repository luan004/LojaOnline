import {readAdmin} from '../data/adminCRUD.js';

readAdmin(decryptCookieValue(getCookie('key'))).then((admin) => {
    document.getElementById("adminAvatar").src = admin.avatar;
    document.getElementById("adminName").innerHTML = admin.name;
    document.getElementById("adminUser").innerHTML = admin.user;
});
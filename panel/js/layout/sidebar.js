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

document.getElementById('sairBtn').addEventListener('click', function() {
  logout();
});

readAdmin(decryptCookieValue(getCookie('key'))).then((admin) => {
  document.getElementById("adminImg").src = admin.avatar;
  document.getElementById("adminUserName").innerHTML = admin.user;
});

var page = window.location.pathname;
var tab;

switch (true) {
  case page.includes('stats'):
    tab = 'stats';
    break;
  case page.includes('custom'):
    tab = 'custom';
    break;
  case page.includes('produtos'):
    tab = 'produtos';
    break;
  case page.includes('clientes'):
    tab = 'clientes';
    break;
  case page.includes('admins'):
    tab = 'admins';
    break;
}

if (tab) {
  document.getElementById(tab).classList.add('active');
}
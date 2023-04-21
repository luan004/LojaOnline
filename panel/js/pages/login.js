import {
    validateAuth
} from '../data/adminCRUD.js';

import {
    getCookie,
    decryptCookieValue,
    encryptCookieValue
  } from '../others/cookies.js';

if (getCookie('user') != null) {
    var user = decryptCookieValue(getCookie('user'));
    var pass = decryptCookieValue(getCookie('pass'));

    validateAuth(user, pass).then((key) => {
        if (key != null) {
            window.location.replace('stats'); 
        }
    });
}

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    var user = document.getElementById('user').value;
    var password = document.getElementById('password').value;

    validateAuth(user,password).then((value) => {
        if (value != null) {
            var secondsExpire = 21600; // TEMPO EM SEGUNDOS QUE LEVARA PARA O COOKIE EXPIRAR
            var time = new Date((secondsExpire*1000) + Date.now()).toUTCString();
            document.cookie = "user="+encryptCookieValue(user)+"; expires=" + time + ';'
            document.cookie = "pass="+encryptCookieValue(password)+"; expires=" + time + ';'
            document.cookie = "key="+encryptCookieValue(value)+"; expires=" + time + ';'
            window.location.replace('stats'); 
        } else {
            document.getElementById("failedAuthMessage").innerHTML = 'Usuario ou senha incorreto!';
        }
    });
});


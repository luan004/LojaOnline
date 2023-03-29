startData();

document.getElementById('idLoginForm').addEventListener('submit', login);

if (getCookie('user') != null) {
    var user = decryptCookieValue(getCookie('user'));
    var pass = decryptCookieValue(getCookie('pass'));

    Promise.resolve(loginAdmin(user,pass)).then((value) => {

        if (value == true) {
            window.location.replace('stats'); 
        }
    });
}

function login(e) {e.preventDefault();

    var user = document.getElementById('user').value;
    var password = document.getElementById('password').value;

    // Tentar logar e gettar em boolean se deu certo ou nao
    Promise.resolve(loginAdmin(user,password)).then((value) => {
        if (value == true) {
            var secondsExpire = 21600; // TEMPO EM SEGUNDOS QUE LEVARA PARA O COOKIE EXPIRAR
            var time = new Date((secondsExpire*1000) + Date.now()).toUTCString();
            document.cookie = "user="+encryptCookieValue(user)+"; expires=" + time + ';'
            document.cookie = "pass="+encryptCookieValue(password)+"; expires=" + time + ';'
            document.cookie = "expireTime="+((secondsExpire*1000) + Date.now())+"; expires=" + time + ';'
            window.location.replace('stats'); 
        } else {
            document.getElementById("failedAuthMessage").innerHTML = 'Usuario ou senha incorretos!';
        }
    }); // ------------------------------------------------
}
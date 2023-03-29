function decryptCookieValue(cipherText) {
    var encryptionKey = getCookieEncryptionKey();
    var bytes = CryptoJS.AES.decrypt(cipherText, encryptionKey);
    var plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText;
}

function getCookieEncryptionKey() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)CIPHER_KEY\s*\=\s*([^;]*).*$)|^.*$/, "$1");
}

function encryptCookieValue(value) {
    var encryptionKey = getCookieEncryptionKey();
    var cipher = CryptoJS.AES.encrypt(value, encryptionKey).toString();
    return cipher.toString();
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
        for(let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
            }
        }
    return null;
}

function checkLogin(user) {
    var pass = decryptCookieValue(getCookie('pass'));
    return firebase.database().ref('admins').orderByChild("user").equalTo(user).once('value').then((snapshot)=>{
        return snapshot.forEach(snapshot=>{
            if (snapshot.child("password").val() == pass) {
                return true;
            }
            return false;
        })
    })
}

function logout() {
    document.cookie = "user= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "pass= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "expireTime= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.replace("login");
}
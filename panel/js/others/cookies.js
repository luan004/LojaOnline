/* ENCRYPTION */
export function encryptCookieValue(value) {
    var key = document.cookie.replace(/(?:(?:^|.*;\s*)CIPHER_KEY\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let cipher = "";
    for (let i = 0; i < value.length; i++) {
      const charCode = value.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      cipher += String.fromCharCode(charCode);
    }
    return btoa(cipher);
}

export function decryptCookieValue(cipher) {
/*     var encryptionKey = document.cookie.replace(/(?:(?:^|.*;\s*)CIPHER_KEY\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    var bytes = CryptoJS.AES.decrypt(cipherText, encryptionKey);
    var plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText; */

    var key = document.cookie.replace(/(?:(?:^|.*;\s*)CIPHER_KEY\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    const decryptedCipher = atob(cipher);
    let plainText = "";
    for (let i = 0; i < decryptedCipher.length; i++) {
      const charCode = decryptedCipher.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      plainText += String.fromCharCode(charCode);
    }
    return plainText;
}
  
/* GET COOKIE VALUE */
export function getCookie(name) {
    const cookies = document.cookie.split(';');
        for(let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
            }
        }
    return null;
}
  
/* ------------ APAGAR --------------- */
export function checkLogin(user) {
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
  
/* GET USER COOKIE VALUE */
export function getCookieUser() {
    return decryptCookieValue(getCookie('user'));
}
  
/* GET PASSWORD COOKIE VALUE */
export function getCookiePassword() {
    return decryptCookieValue(getCookie('password'));
}
  
/* LOGOUT ADMIN */
export function logout() {
    document.cookie = "user= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "pass= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "key= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "expireTime= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.replace("login");
}
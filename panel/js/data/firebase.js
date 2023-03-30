/* CHECK COOKIES */
function validateSession() {
  if (getCookie('user') == null || getCookie('pass') == null) {
    logout();
  } else {
    var user = decryptCookieValue(getCookie('user'));
    var pass = decryptCookieValue(getCookie('pass'));
    firebase.database().ref('admins').orderByChild("user").equalTo(user).once('value').then((snapshot)=>{
      if (snapshot.exists() == false) {
          logout();
      }
      snapshot.forEach(snapshot=>{
        if(snapshot.child("password").val() != pass){
            logout();
        }
      })
    })
  }
}

/* START FIREBASE */
function startData() {
  const firebaseConfig = {
    apiKey: document.cookie.replace(/(?:(?:^|.*;\s*)FIREBASE_KEY\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
    authDomain: "data-tcc.firebaseapp.com",
    databaseURL: "https://data-tcc-default-rtdb.firebaseio.com",
    projectId: "data-tcc",
    storageBucket: "data-tcc.appspot.com",
    messagingSenderId: document.cookie.replace(/(?:(?:^|.*;\s*)FIREBASE_SENDER\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
    appId: document.cookie.replace(/(?:(?:^|.*;\s*)FIREBASE_APPID\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
    measurementId: document.cookie.replace(/(?:(?:^|.*;\s*)FIREBASE_MEN\s*\=\s*([^;]*).*$)|^.*$/, "$1")
  };
firebase.initializeApp(firebaseConfig);
}

/* ENCRYPTION */
function encryptCookieValue(value) {
  var encryptionKey = document.cookie.replace(/(?:(?:^|.*;\s*)CIPHER_KEY\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  var cipher = CryptoJS.AES.encrypt(value, encryptionKey).toString();
  return cipher.toString();
}
function decryptCookieValue(cipherText) {
  var encryptionKey = document.cookie.replace(/(?:(?:^|.*;\s*)CIPHER_KEY\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  var bytes = CryptoJS.AES.decrypt(cipherText, encryptionKey);
  var plainText = bytes.toString(CryptoJS.enc.Utf8);
  return plainText;
}

/* GET COOKIE VALUE */
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

/* ------------ APAGAR --------------- */
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

/* GET USER COOKIE VALUE */
function getCookieUser() {
  return decryptCookieValue(getCookie('user'));
}

/* GET PASSWORD COOKIE VALUE */
function getCookiePassword() {
  return decryptCookieValue(getCookie('password'));
}

/* LOGOUT ADMIN */
function logout() {
  document.cookie = "user= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "pass= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "expireTime= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.replace("login");
}
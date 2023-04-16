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
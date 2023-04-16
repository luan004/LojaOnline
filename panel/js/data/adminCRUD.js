function createAdmin(user, password, name, cpf, avatar, bornDate) {
  const ref = firebase.database().ref('admins').push();
  const keyRef = ref.key;

  ref.set({
    'user': user,
    'password': password,
    'name': name,
    'cpf': cpf,
    'avatar': '',
    'bornDate': bornDate
  }).then(() => {
    firebase.storage().ref().child(`admins/${keyRef}.jpg`).put(avatar.files[0]).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        updateAdmin(keyRef, 'avatar', url);
      });
    });
  });
}

function readAdmin(user) {
  return firebase.database().ref("admins")
  .orderByChild("user")
  .equalTo(user)
  .once("value")
  .then((snapshot) => {
    const key = Object.keys(snapshot.val())[0];
    return [snapshot.val()[key], key];
  })
}

function updateAdmin(key, field, value) {
  const ref = firebase.database().ref(`admins/${key}`);
  const updates = {};
  updates[field] = value;
  ref.update(updates);
}

function deleteAdmin(key) {
  firebase.database().ref("admins/").child(key).remove();
  firebase.storage().ref().child(`admins/${key}.jpg`).delete();
}

// - OTHERS ---
function validateAuth(user,password) {
    return firebase.database().ref('admins').orderByChild("user").equalTo(user).once('value').then((snapshot)=>{
        return snapshot.forEach(snapshot=>{     
            var bool = false;
            if (snapshot.child("password").val() == password){
                bool = true;
            } else {
                bool = false;
            }
            return bool
        })
    })   
}
function checkIfAnUserExists(user) {
    return firebase.database().ref('admins').orderByChild("user").equalTo(user).once('value').then((snapshot)=>{
        if (snapshot.exists()) {
            return true;
        } else {
            return false;
        }
    })   
}
async function createAdmin(user, password, name, cpf, avatarUrl, bornDate) {
    const snapshot = await firebase
      .database()
      .ref('admins')
      .orderByChild('user')
      .equalTo(user)
      .once('value');
    
    if (snapshot.exists()) {
      return false;
    }
    
    await firebase.database().ref('admins').push().set({
      user: user,
      password: password,
      name: name,
      cpf: cpf,
      avatar: avatarUrl,
      bornDate: bornDate
    });
    
    return true;
}

function deleteAdmin(user) {  
  firebase.database().ref("admins")
    .orderByChild("user")
    .equalTo(user)
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          child.ref.remove();
          deleteAvatar(user);
        });
      } else {
        console.log(`Admin ${user} não foi encontrado.`);
      }
    })
    .catch((error) => {
        console.log(`Ocorreu um erro ao tentar remover o admin ${user}:\n ${error}`);
    }
  );
}

function uploadAvatar(file, user) {
  return firebase.storage().ref().child(`avatars/${user}.jpg`).put(file)
    .then((snapshot) => {
      return snapshot.ref.getDownloadURL();
    })
    .catch((error) => {
      console.error('Error uploading file:', error);
      return null;
    });
}

function deleteAvatar(user) {
  firebase.storage().ref('avatars/' + user + '.jpg').delete()
    .then(() => {
      console.log('Arquivo apagado com sucesso!');
    })
    .catch((error) => {
      console.error('Ocorreu um erro ao apagar o arquivo:', error);
  });
}

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

function getAdminName(user) {
    const a= firebase.database().ref('admins').orderByChild("user").equalTo(user).once('value').then((snapshot)=>{
        return snapshot.forEach(snapshot=>{     
            return snapshot.child("name").val();
        })
    })
    console.log(a);
}
function getAllData(x) {
  var data = firebase.database().ref(x);
  data.on('value', (snapshot) => {
    var data = snapshot.val();
    console.log(data);
  });
}

function getPasswordFromUser(user) {
  var value;
  firebase.database().ref('admins').orderByChild("user").equalTo(user).once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var  value = childSnapshot.child("password").val();
        console.log('Senha: '+ value);
      });
  });
}
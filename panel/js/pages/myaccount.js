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

        document.getElementById("avat").src = snapshot.child("avatar").val();
        document.getElementById("name").innerHTML = snapshot.child("name").val();
        document.getElementById("age").innerHTML = calcAge(snapshot.child("bornDate").val()) + ' anos';
        document.getElementById("user").innerHTML = snapshot.child("user").val();
        document.getElementById("cpf").innerHTML = formatCpf(snapshot.child("cpf").val());
        document.getElementById("born").innerHTML = formatBorn(snapshot.child("bornDate").val());
    })
})
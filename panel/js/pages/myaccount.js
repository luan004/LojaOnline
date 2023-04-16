var user = decryptCookieValue(getCookie('user'));
var pass = decryptCookieValue(getCookie('pass'));

/* VALIDATIONS */
document.getElementById("name").addEventListener("input", function() {
    this.value = formatName(this.value);
});
document.getElementById("name").addEventListener("blur", function() {
    this.value = this.value.trim();
});
document.getElementById("oldpassword").addEventListener("input", function() {
    this.value = formatPassword(this.value);
});
document.getElementById("password").addEventListener("input", function() {
    this.value = formatPassword(this.value);
});
document.getElementById("password2").addEventListener("input", function() {
    this.value = formatPassword(this.value);
});
document.getElementById("cpf").addEventListener("input", function() {;
    this.value = formatCpf(this.value);
});


/* READ ADMIN DATA */
readAdmin(user).then((user) => {
    document.getElementById("avat").src = user[0].avatar;
})
readAdmin(user).then((user) => {
    document.getElementById("fname").innerHTML = user[0].name;
})
readAdmin(user).then((user) => {
    document.getElementById("age").innerHTML = calcAge(user[0].bornDate) + ' anos';
})

readAdmin(user).then((user) => {
    document.getElementById("name").value = user[0].name;
});
readAdmin(user).then((user) => {
    document.getElementById("cpf").value = formatCpf(user[0].cpf);
});
readAdmin(user).then((user) => {
    document.getElementById("bornDate").value = user[0].bornDate;
});



/* CREATE ADMIN */
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var cpf = document.getElementById('cpf').value.replace(/\D+/g, '');
    var bornDate = document.getElementById('bornDate').value;
    //var avatar = document.getElementById("avatar");
    
    var opass = document.getElementById('oldpassword').value;
    var pass1 = document.getElementById('password').value;
    var pass2 = document.getElementById('password2').value;

    readAdmin(user).then((user) => {
        if (opass == '' && pass1 == '' && pass2 == '' && name != '' && cpf.length == 11 && bornDate != '') {
            updateAdmin(user[1], 'name', name);
            updateAdmin(user[1], 'cpf', cpf);
            updateAdmin(user[1], 'bornDate', bornDate);

            location.reload();
        }
        else if (opass == user[0].password && pass1.length > 7 && pass1 == pass2 && name != '' && cpf.length == 11 && bornDate != '') {
            updateAdmin(user[1], 'name', name);
            updateAdmin(user[1], 'cpf', cpf);
            updateAdmin(user[1], 'bornDate', bornDate);
            updateAdmin(user[1], 'password', pass1);

            logout();
        }
        else {
            document.getElementById('idErrorLabel').innerHTML = '<span>Preencha todos os campos corretamente!</span>';
        }
    });
});
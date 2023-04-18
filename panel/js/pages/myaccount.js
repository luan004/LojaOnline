import {
    readAdmin,
    updateAdmin
} from '../data/adminCRUD.js'

import {
    formatName,
    formatPassword,
    formatCpf,
    calcAge
} from '../others/formats.js'

var user = decryptCookieValue(getCookie('user'));
var key = decryptCookieValue(getCookie('key'));

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
readAdmin(key).then((user) => {
    document.getElementById("avat").src = user.avatar;
})
readAdmin(key).then((user) => {
    document.getElementById("fname").innerHTML = user.name;
})
readAdmin(key).then((user) => {
    document.getElementById("age").innerHTML = calcAge(user.bornDate) + ' anos';
})

readAdmin(key).then((user) => {
    document.getElementById("name").value = user.name;
});
readAdmin(key).then((user) => {
    document.getElementById("cpf").value = formatCpf(user.cpf);
});
readAdmin(key).then((user) => {
    document.getElementById("bornDate").value = user.bornDate;
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

    if (opass == '' && pass1 == '' && pass2 == '' && name != '' && cpf.length == 11 && bornDate != '') {
        updateAdmin(key, 'name', name);
        updateAdmin(key, 'cpf', cpf);
        updateAdmin(key, 'bornDate', bornDate);

        location.reload();
    }
    else if (opass == key.password && pass1.length > 7 && pass1 == pass2 && name != '' && cpf.length == 11 && bornDate != '') {
        updateAdmin(key, 'name', name);
        updateAdmin(key, 'cpf', cpf);
        updateAdmin(key, 'bornDate', bornDate);
        updateAdmin(key, 'password', pass1);

        logout();
    }
    else {
        document.getElementById('idErrorLabel').innerHTML = '<span>Preencha todos os campos corretamente!</span>';
    }
});
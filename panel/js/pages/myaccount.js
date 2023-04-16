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
    document.getElementById("avat").src = user.avatar;
})
readAdmin(user).then((user) => {
    document.getElementById("fname").innerHTML = user.name;
})
readAdmin(user).then((user) => {
    document.getElementById("age").innerHTML = calcAge(user.bornDate) + ' anos';
})

readAdmin(user).then((user) => {
    document.getElementById("name").value = user.name;
});
readAdmin(user).then((user) => {
    document.getElementById("cpf").value = formatCpf(user.cpf);
});
readAdmin(user).then((user) => {
    document.getElementById("bornDate").value = user.bornDate;
});
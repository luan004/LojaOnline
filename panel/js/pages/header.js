document.getElementById('actualDate').innerHTML = getDate();
document.getElementById('actualTime').innerHTML = getTime();

setInterval(function() {
    document.getElementById('actualDate').innerHTML = getDate();
    document.getElementById('actualTime').innerHTML = getTime();
}, 1000)

readAdmin(decryptCookieValue(getCookie('key'))).then((admin) => {
    document.getElementById("adminAvatar").src = admin.avatar;
    document.getElementById("adminName").innerHTML = admin.name;
    document.getElementById("adminUser").innerHTML = admin.user;
});
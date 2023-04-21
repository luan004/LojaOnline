var tab = document.getElementById(window.location.href.split("/")[window.location.href.split("/").length - 1]);
tab.classList.add('selected');

var i = false;
function openSideBar() {
    const sideBar = document.getElementById("sideBar");
    const content = document.getElementById("opacityArea");
    if (i == true) {
        sideBar.classList.remove("sideBarOpened");
        content.classList.remove("opacityAreaOpened");
        i = false;
    } else {
        sideBar.classList.add('sideBarOpened');
        content.classList.add("opacityAreaOpened");
        i = true;
    }
}

function closeSideBar() {
    if (i == true) {
        const sideBar = document.getElementById("sideBar");
        const content = document.getElementById("opacityArea");
        sideBar.classList.remove("sideBarOpened");
        content.classList.remove("opacityAreaOpened");
        i = false;
    }
}
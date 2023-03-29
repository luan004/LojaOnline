var i = 0;
function sideBarMenuOpenFunction() {
    if (i == 0) {

        document.getElementById('idSideBarButton').classList.add('sideBarButtonClicked');
        document.getElementById('idSideBarArea').classList.add('sideBarBarClicked');

        i = 1;
    }
    else {

        document.getElementById('idSideBarButton').classList.remove('sideBarButtonClicked');
        document.getElementById('idSideBarArea').classList.remove('sideBarBarClicked');
        i = 0;
    }
}
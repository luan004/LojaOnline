loadImages();

document.getElementById("down1").addEventListener("click", function() {
    downloadFile(document.getElementById("slide1").src);
})

document.getElementById("down2").addEventListener("click", function() {
    downloadFile(document.getElementById("slide2").src);
})

document.getElementById("down3").addEventListener("click", function() {
    downloadFile(document.getElementById("slide3").src);
})

function loadImages() {
    document.getElementById("slide1").src = 'http://localhost/tcc/web/images/img1.jpg';
    document.getElementById("slide2").src = 'http://localhost/tcc/web/images/img1.jpg';
    document.getElementById("slide3").src = 'http://localhost/tcc/web/images/img1.jpg';
}
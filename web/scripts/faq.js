var a = document.getElementsByClassName("faqButton");
var b;

for (b = 0; b < a.length; b++) {
    a[b].addEventListener("click", function() {
    this.classList.toggle("faqActive");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
});
}
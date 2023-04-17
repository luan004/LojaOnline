getSlideshowData('slideshow/enable').then((val) => {
  if (val == true) {
      $("#slideshow").load("../web/resources/layout/slideshow.html", function() {
        getSlideshowData('slideshow').then((val) => {
          document.getElementById('slide1').src = val.slide1;
          document.getElementById('slide2').src = val.slide2;
          document.getElementById('slide3').src = val.slide3;
        })
    
        let slideIndex = 1;
        showSlides(slideIndex);

        autoPlus();
        currentSlide(1);
    
        function plusSlides(n) {
          showSlides(slideIndex += n);
        }
    
        function currentSlide(n) {
          showSlides(slideIndex = n);
        }
    
        function showSlides(n) {
          let i;
          let slides = document.getElementsByClassName("slide");
          let dots = document.getElementsByClassName("dot");
          if (n > slides.length) {slideIndex = 1}    
          if (n < 1) {slideIndex = slides.length}
      
          for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
          }
          for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" dotActive", "");
          }
      
          slides[slideIndex-1].style.display = "block";  
          dots[slideIndex-1].className += " dotActive";
        }
    
        function autoPlus() {
          plusSlides(1);  
          setTimeout(autoPlus, 4000);  
        }
      });
  }
});
$(function(){  
  isEnabled('slideshow').then((val) => {
      if (val == true) {
          $("#slideshow").load("../web/resources/layout/slideshow.html");
      }
  })
});
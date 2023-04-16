$(function(){  
  getSlideshowData('slideshow/enable').then((val) => {
      if (val == true) {
          $("#slideshow").load("../web/resources/layout/slideshow.html");
      }
  })
});
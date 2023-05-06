import {getData} from '../data/customFunctions.js';

$(document).ready(function() {
  getData('slideshow/enable').then((val) => {
    if (val == true) {
      $("#slideshow").load("../web/resources/layout/slideshow.html", function() {
        getData('slideshow').then((val) => {
          document.getElementById('slide1').src = val.slide1;
          document.getElementById('slide2').src = val.slide2;
          document.getElementById('slide3').src = val.slide3;
        })
      })
    }
  })
})

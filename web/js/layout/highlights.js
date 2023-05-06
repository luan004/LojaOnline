import {readProduct} from '../data/productCRUD.js';
import {getData} from '../data/customFunctions.js';

$(document).ready(function() {
  getData('carousel/enable').then((val) => {
    if (val == true) {
      $("#highlights").load("../web/resources/layout/highlights.html", function() {
        /* TITLE */
        getData('carousel/title').then((val) => {
          document.getElementById('titleHightlights').innerHTML = val;
        })

        /* LOAD PRODUCTS */
        for (let i = 1; i <= 4; i++) {
          (function(index) {
            getData('carousel/product' + index).then((val) => {
              readProduct(val).then((product) => {
                document.getElementById('product' + index + 'img').src = product.image;
                document.getElementById('product' + index + 'name').innerHTML = product.name;
                document.getElementById('product' + index + 'name').href = './product?key=' + val;
                document.getElementById('product' + index + 'price').innerHTML = 'R$' + product.price;
              })
            })
          })(i);
        }
      })
    }
  })
})
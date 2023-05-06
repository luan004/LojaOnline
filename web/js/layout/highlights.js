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
                document.getElementById('product' + index + 'link').href = './product?p=' + val;

                const price = product.price.toFixed(2).toString().replace('.', ',');
                const newPrice = (product.price - (product.discount/100 * product.price)).toFixed(2).toString().replace('.', ',');
            
                if (product.discount == 0) {
                  document.getElementById('product' + index + 'price').innerHTML = 'R$' + price;
                } else {
                  document.getElementById('product' + index + 'price').innerHTML = 'R$' + newPrice + ' <del class="h6" style="color:#880000">R$'+price+'</del>';
                } 
              })
            })
          })(i);
        }
      })
    }
  })
})
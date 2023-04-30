import {readProduct} from '../data/productCRUD.js';
import {getData} from '../data/customFunctions.js';

var url = new URL(window.location.href);
var key = url.searchParams.get("p");

if (key == null || key == '') {
    window.location.replace("./");
}

readProduct(key).then((product) => {
    if (product == null) {
        window.location.replace("./");
    }
    document.getElementById('prodImage').src = product.image;
    document.getElementById('prodName').innerHTML = product.name;
    document.getElementById('prodDescrip').innerHTML = product.description;
    document.getElementById('price').innerHTML = product.price.replace('.', ',');

    document.getElementById('likes').innerHTML = product.likes;
    document.getElementById('views').innerHTML = product.viewCount;
});


/* HIGHLIGHTS */
$(document).ready(function() {
    getData('carousel/enable').then((val) => {
      if (val == true) {
        $("#highlights").load("../web/resources/layout/highlights.html", function() {
          /* TITLE */
          getData('carousel/title').then((val) => {
            document.getElementById('titleHightlights').innerHTML = val;
          })
  
          /* 1 */
          getData('carousel/product1').then((val) => {
            readProduct(val).then((product) => {
              document.getElementById('product1img').src = product.image;
              document.getElementById('product1name').innerHTML = product.name;
              document.getElementById('product1name').href = './product?key=' + val;
              document.getElementById('product1price').innerHTML = 'R$' + product.price.replace('.', ',');
            })
          })
  
          /* 2 */
          getData('carousel/product2').then((val) => {
            readProduct(val).then((product) => {
              document.getElementById('product2img').src = product.image;
              document.getElementById('product2name').innerHTML = product.name;
              document.getElementById('product2name').href = './product?key=' + val;
              document.getElementById('product2price').innerHTML = 'R$' + product.price.replace('.', ',');
            })
          })
  
          /* 3 */
          getData('carousel/product3').then((val) => {
            readProduct(val).then((product) => {
              document.getElementById('product3img').src = product.image;
              document.getElementById('product3name').innerHTML = product.name;
              document.getElementById('product3name').href = './product?key=' + val;
              document.getElementById('product3price').innerHTML = 'R$' + product.price.replace('.', ',');
            })
          })
  
          /* 4 */
          getData('carousel/product4').then((val) => {
            readProduct(val).then((product) => {
              document.getElementById('product4img').src = product.image;
              document.getElementById('product4name').innerHTML = product.name;
              document.getElementById('product4name').href = './product?key=' + val;
              document.getElementById('product4price').innerHTML = 'R$' + product.price.replace('.', ',');
            })
          })  
        })
      }
    })
})
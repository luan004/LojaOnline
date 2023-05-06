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

          var i = 1;
          while(i <= 4) {
            console.log(i);
            getData('carousel/product1').then((val) => {
              readProduct(val).then((product) => {
                document.getElementById('product1img').src = product.image;
                document.getElementById('product1name').innerHTML = product.name;
                document.getElementById('product1name').href = './product?key=' + val;
                document.getElementById('product1price').innerHTML = 'R$' + product.price;
              })
            })

            i++;
          }

  
/*           getData('carousel/product1').then((val) => {
            readProduct(val).then((product) => {
              document.getElementById('product1img').src = product.image;
              document.getElementById('product1name').innerHTML = product.name;
              document.getElementById('product1name').href = './product?key=' + val;
              document.getElementById('product1price').innerHTML = 'R$' + product.price.replace('.', ',');
            })
          })
  
          getData('carousel/product2').then((val) => {
            readProduct(val).then((product) => {
              document.getElementById('product2img').src = product.image;
              document.getElementById('product2name').innerHTML = product.name;
              document.getElementById('product2name').href = './product?key=' + val;
              document.getElementById('product2price').innerHTML = 'R$' + product.price.replace('.', ',');
            })
          })

          getData('carousel/product3').then((val) => {
            readProduct(val).then((product) => {
              document.getElementById('product3img').src = product.image;
              document.getElementById('product3name').innerHTML = product.name;
              document.getElementById('product3name').href = './product?key=' + val;
              document.getElementById('product3price').innerHTML = 'R$' + product.price;
            })
          })
  
          getData('carousel/product4').then((val) => {
            readProduct(val).then((product) => {
              document.getElementById('product4img').src = product.image;
              document.getElementById('product4name').innerHTML = product.name;
              document.getElementById('product4name').href = './product?key=' + val;
              document.getElementById('product4price').innerHTML = 'R$' + product.price.replace('.', ',');
            })
          })   */
        })
      }
    })
})
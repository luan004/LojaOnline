import {readProduct, updateProduct} from '../data/productCRUD.js';
/* import {formatCep} from '../others/formats.js'; */

var url = new URL(window.location.href);
var key = url.searchParams.get("p");

if (key == null || key == '') {
    window.location.replace("./");
}

readProduct(key).then((product) => {
    if (product == null) {
        window.location.replace("./");
    }

    var view = product.viewCount + 1;
    updateProduct(key, 'viewCount', view);

    document.getElementById('prodImage').src = product.image;
    document.getElementById('prodName').innerHTML = product.name;
    document.getElementById('prodDescrip').innerHTML = product.description;

    document.getElementById('likes').innerHTML = product.likes;
    document.getElementById('stock').innerHTML = product.stock;
    document.getElementById('views').innerHTML = view;

    const price = product.price.toFixed(2).toString().replace('.', ',');
    const discount = product.discount.toFixed().toString().replace('.', ',');
    const newPrice = (product.price - (product.discount/100 * product.price)).toFixed(2).toString().replace('.', ',');

    if (product.discount == 0) {
      document.getElementById('price').innerHTML = 'R$' + price;
    } else {
      document.getElementById('price').innerHTML = 'R$' + newPrice + '<span class="h6" style="color:blue;"> '
      + discount + '% de desconto!</span>';
      document.getElementById('oldPrice').innerHTML = 'R$' + price;
    }
});

/* document.getElementById("cep").addEventListener("input", function() {
  this.value = formatCep(this.value);
});


document.getElementById('cepForm').addEventListener('submit', function(e){
  e.preventDefault();
  const cep = document.getElementById("cep");

  if (cep.value.length != 9) {
    cep.classList.add('is-invalid');
  } else {
    cep.classList.remove('is-invalid');
  }
}); */

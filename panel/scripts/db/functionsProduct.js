function createProduct(name,price,description,category,image,stock) {
    var data = firebase.database().ref('products');

    var dataPush = data.push();
    dataPush.set({
        "name": name,
        "price": price,
        "description": description,
        "category": category,
        "image": image,
        "stock": stock,
        "viewCount" : 0,
        "likes" : 0
    });
}

function deleteProductByKey(key) {
    firebase.database().ref("products/").child(key).remove()
      .then(() => {
        console.log(`Produto de ID "${key}" apagado com sucesso.`);
      })
      .catch((error) => {
        console.error(`Erro ao apagar produto de ID: "${key}":\n`, error);
      });
}
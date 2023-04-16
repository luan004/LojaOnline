function createProduct(name,price,description,category,image,stock) {
    firebase.database().ref('products').push().set({
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

/* function readProduct(key, attribute) {
  const ref = firebase.database().ref(`products/${key}/${attribute}`);
  return ref.once('value').then((snapshot) => {
    return snapshot.val();
  });
} */

function updateProduct(key, attribute, value) {

  console.log(value);

  const ref = firebase.database().ref(`products/${key}`);
  const updates = {};
  updates[attribute] = value;
  ref.update(updates);
}

function deleteProduct(key) {
    firebase.database().ref("products/").child(key).remove();
}
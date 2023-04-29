export function createProduct(name, price, description, category, image, stock) {
  const ref = firebase.database().ref('products').push();
  const keyRef = ref.key;

  ref.set({
    "name": name,
    "price": price,
    "description": description,
    "category": category,
    "image": '',
    "stock": stock,
    "viewCount": 0,
    "likes": 0
  }).then(() => {
    firebase.storage().ref().child(`products/${keyRef}.jpg`).put(image.files[0]).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        updateProduct(keyRef, 'image', url);
      });
    });
  });
}

export function readProduct(key) {
  const ref = firebase.database().ref(`products/${key}`);
  return ref.once('value').then((snapshot) => {
    return snapshot.val();
  });
}

export function updateProduct(key, field, value) {
  const ref = firebase.database().ref(`products/${key}`);
  const updates = {};
  updates[field] = value;
  ref.update(updates);
}

export function deleteProduct(key) {
  firebase.database().ref("products/").child(key).remove();
  firebase.storage().ref().child(`products/${key}.jpg`).delete();
}

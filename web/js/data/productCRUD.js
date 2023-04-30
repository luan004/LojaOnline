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
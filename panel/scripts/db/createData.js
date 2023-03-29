function createProduct(title, price, description, category, image, stock) {
    var data = firebase.database().ref('products');

    var dataPush = data.push();
    dataPush.set({
        "name": title,
        "price": price,
        "description": description,
        "category": category,
        "image": image,
        "stock": stock
    });
}

function createAdmin(user, password) {
    var data = firebase.database().ref('admins');

    var dataPush = data.push();
    dataPush.set({
        "user": user,
        "password": password
    });
}
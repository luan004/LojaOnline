function getProductMost(order) {
    return firebase.database().ref('products').orderByChild(order).limitToLast(1).once('value')
    .then((snapshot) => {
        return Object.values(snapshot.val())[0].name;
    })
}

function getNumChildren(loc) {
    return firebase.database().ref(loc).once('value', function(snapshot) {
        return snapshot.numChildren();
    });
}
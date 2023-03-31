function uploadImage(slideNum, image) {
    return firebase.storage().ref().child(`customizations/slideshow/slide${slideNum}.jpg`).put(image)
    .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
    })
    .catch((error) => {
        console.error('Error uploading file:', error);
        return null;
    });
}

function isEnabled(x) {
    return firebase.database().ref(`custom/${x}/enable`).once('value').then((snapshot) => {
        return snapshot.val();
    })
}
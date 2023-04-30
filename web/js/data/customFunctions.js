export function getData(loc) {
    return firebase.database().ref(`custom/${loc}`).once('value').then((snapshot) => {
        return snapshot.val();
    })
}
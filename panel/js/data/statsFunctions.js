import {
    calcAge
} from '../others/formats.js';

export function getProductMost(order) {
    return firebase.database().ref('products').orderByChild(order).limitToLast(1).once('value')
    .then((snapshot) => {
        return Object.values(snapshot.val())[0].name;
    })
}

export function getNumChildren(loc) {
    return firebase.database().ref(loc).once('value').then((snapshot) => {
        return snapshot.numChildren();
    });
}

export function getMediumAge() {
    return firebase.database().ref('admins').once('value').then((snapshot) => {
      let sumAge = 0;
      let numAdmins = 0;
  
      snapshot.forEach((adminSnapshot) => {
        const birthDate = new Date(adminSnapshot.child('bornDate').val());
        const age = calcAge(birthDate);
        
        sumAge += age;
        numAdmins++;
      });
  
      return sumAge / numAdmins;
    });
}
import {
    readProduct
} from '../data/productCRUD.js';

export function changeSwitchValue(swit) {
    firebase.database().ref('custom/'+swit+'/enable').once('value').then((snap) => {
        if (snap.val() == false) {
            firebase.database().ref('custom/'+swit).update({'enable':true});
        } else {
            firebase.database().ref('custom/'+swit).update({'enable':false});
        }
    })
}

export function loadSwitch(switchid) {
    firebase.database().ref('custom/'+switchid+'/enable').once('value').then((snap) => {
        if (snap.val() == true) {
            document.getElementById(switchid).checked = true;
        }
    })
}

export function loadCarouselProduct(num) {
    getCarouselProduct(num).then((key) => {
        readProduct(key).then((product) => {
            document.getElementById('product'+num+'img').src = product.image;
            document.getElementById('product'+num+'name').innerHTML = product.name;
            document.getElementById('product'+num+'desc').innerHTML = product.description;
            document.getElementById('product'+num+'price').innerHTML = 'R$'+product.price.replace('.', ',');
            document.getElementById('product'+num+'id').value = key;
        });
    })
}


export function getCarouselProduct(num) {
    return firebase.database().ref("custom/carousel/product" + num).once('value')
    .then((snapshot) => {
        return snapshot.val();
    })
}

export function uploadSlideFile(file, num) {
    firebase.storage().ref().child(`custom/slideshow/slide${num}.jpg`).put(file);

    getSlideSrc(num).then((value) => {
        const updates = {};
        updates['slide'+num] = value;
        firebase.database().ref('custom/slideshow/').update(updates);
    });
}

export function getSlideSrc(num) {
    return firebase.storage().ref().child(`custom/slideshow/slide${num}.jpg`).getDownloadURL()
    .then(url => {
        return url;
    })
}

export function changeCarouselTitle(title) {
    if(title == '') {title = 'Destaques'}
    const value = {
        "title": title,
    };
    firebase.database().ref('custom/carousel/').update(value);
}

export function loadCarouselTitle() {
    firebase.database().ref('custom/carousel/title').once('value')
    .then((snapshot) => {
        document.getElementById("inputTitle").value = snapshot.val();
    })
}

export function changeCarouselProduct(id, num) {
    var product = 'product'+num;
    const value = {
        [product]: id
    };
    firebase.database().ref('custom/carousel/').update(value);
}
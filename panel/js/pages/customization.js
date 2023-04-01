loadSwitch('slideshow');
loadSlide(1);
loadSlide(2);
loadSlide(3);

loadSwitch('carousel');
loadCarouselTitle();
loadCarouselProduct(1);
loadCarouselProduct(2);
loadCarouselProduct(3);
loadCarouselProduct(4);

/* SWITCHS LISTENERS */
document.getElementById("slideshow").addEventListener("change", function() {
    changeSwitchValue('slideshow');
})
document.getElementById("carousel").addEventListener("change", function() {
    changeSwitchValue('carousel');
})

/* DOWNLOAD BUTTONS LISTENERS */
document.getElementById("down1").addEventListener("click", function() {
    downloadFile(document.getElementById("slide1").src);
})
document.getElementById("down2").addEventListener("click", function() {
    downloadFile(document.getElementById("slide2").src);
})
document.getElementById("down3").addEventListener("click", function() {
    downloadFile(document.getElementById("slide3").src);
})

/* EDIT BUTTONS LISTENERS */
document.getElementById("edit1").addEventListener("click", async function() {
    const file = await selectJpgFile();
    Promise.resolve(uploadSlideFile(file, 1)).then((r) => {
        loadSlide(1);
    })
})
document.getElementById("edit2").addEventListener("click", async function() {
    const file = await selectJpgFile();
    Promise.resolve(uploadSlideFile(file, 2)).then((r) => {
        loadSlide(2);
    })
})
document.getElementById("edit3").addEventListener("click", async function() {
    const file = await selectJpgFile();
    Promise.resolve(uploadSlideFile(file, 3)).then((r) => {
        loadSlide(3);
    })
})

/* CAROUSEL TITLE LISTENER */
document.getElementById('inputTitle').addEventListener('blur', function() {
    changeCarouselTitle(this.value);
})

/* PRODUCTS LISTENERS */
document.getElementById('product1id').addEventListener('blur', function() {
    Promise.resolve(checkIfAProductExists(this.value)).then((res) => {
        if (res) {
            changeCarouselProduct(this.value, 1);
        } else {
            this.value = getCarouselProduct();
        }
        loadCarouselProduct(1);
    })
})
document.getElementById('product2id').addEventListener('blur', function() {
    Promise.resolve(checkIfAProductExists(this.value)).then((res) => {
        if (res) {
            changeCarouselProduct(this.value, 2);
        } else {
            this.value = getCarouselProduct();
        }
        loadCarouselProduct(2);
    })
})
document.getElementById('product3id').addEventListener('blur', function() {
    Promise.resolve(checkIfAProductExists(this.value)).then((res) => {
        if (res) {
            changeCarouselProduct(this.value, 3);
        } else {
            this.value = getCarouselProduct();
        }
        loadCarouselProduct(3);
    })
})
document.getElementById('product4id').addEventListener('blur', function() {
    Promise.resolve(checkIfAProductExists(this.value)).then((res) => {
        if (res) {
            changeCarouselProduct(this.value, 4);
        } else {
            this.value = getCarouselProduct();
        }
        loadCarouselProduct(4);
    })
})

/* CHANGE SWITCH VALUES */
function changeSwitchValue(swit) {
    firebase.database().ref('custom/'+swit+'/enable').once('value').then((snap) => {
        if (snap.val() == false) {
            firebase.database().ref('custom/'+swit).update({'enable':true});
        } else {
            firebase.database().ref('custom/'+swit).update({'enable':false});
        }
    })
}

/* LOAD SWITCHS VALUES */
function loadSwitch(switchid) {
    firebase.database().ref('custom/'+switchid+'/enable').once('value').then((snap) => {
        if (snap.val() == true) {
            document.getElementById(switchid).checked = true;
        }
    })
}

/* LOAD SLIDES FROM DATA */
function loadSlide(num) {
    Promise.resolve(getSlideSrc(num)).then((val) => {
        document.getElementById("slide"+num).src = val;
    })
}

/* LOAD PRODUCTS FROM DATA */
function loadCarouselProduct(num) {
    Promise.resolve(getCarouselProduct(num)).then((value) => {
        firebase.database().ref('products/').child(value).once('value').then((snap) => {
            document.getElementById('product'+num+'img').src = snap.val().image;
            document.getElementById('product'+num+'name').innerHTML = snap.val().name;
            document.getElementById('product'+num+'desc').innerHTML = snap.val().description;
            document.getElementById('product'+num+'price').innerHTML = 'R$'+snap.val().price.replace('.', ',');
            document.getElementById('product'+num+'id').value = value;
        })
    })
}

async function selectJpgFile() {
    const [fileHandle] = await window.showOpenFilePicker({
        types: [{
            description: 'Imagens JPG',
            accept: {
                'image/jpeg': ['.jpg', '.jpeg'],
            },
        }],
    });
    const file = await fileHandle.getFile();
    return file;
}

function getCarouselProduct(num) {
    return firebase.database().ref("custom/carousel/product" + num).once('value')
    .then((snapshot) => {
        return snapshot.val();
    })
}

function uploadSlideFile(file, num) {
    return firebase.storage().ref().child(`custom/slideshow/slide${num}.jpg`).put(file)
    .then((snapshot) => {
        return true;
    })
    .catch((error) => {
        console.error('Error uploading file:', error);
        return false;
    });
}

function getSlideSrc(num) {
    return firebase.storage().ref().child(`custom/slideshow/slide${num}.jpg`).getDownloadURL()
    .then(url => {
        return url;
    })
    .catch(error => {
        console.error('Error getting download URL:', error);
        return null;
    });
}

function changeCarouselTitle(title) {
    if(title == '') {title = 'Destaques'}
    const value = {
        "title": title,
    };
    firebase.database().ref('custom/carousel/').update(value);
}

function loadCarouselTitle() {
    firebase.database().ref('custom/carousel/title').once('value')
    .then((snapshot) => {
        document.getElementById("inputTitle").value = snapshot.val();
    })
}

function changeCarouselProduct(id, num) {
    var product = 'product'+num;
    const value = {
        [product]: id
    };
    firebase.database().ref('custom/carousel/').update(value);
}
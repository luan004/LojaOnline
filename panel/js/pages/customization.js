loadImages();
/* LOAD IMAGES FROM DATA */
function loadImages() {
    Promise.resolve(getSlideSrc(1)).then((src1) => {
        document.getElementById("slide1").src = src1;
    })
    Promise.resolve(getSlideSrc(2)).then((src2) => {
        document.getElementById("slide2").src = src2;
    })
    Promise.resolve(getSlideSrc(3)).then((src3) => {
        document.getElementById("slide3").src = src3;
    })
}

/* DOWNLOAD BUTTONS */
document.getElementById("down1").addEventListener("click", function() {
    downloadFile(document.getElementById("slide1").src);
})
document.getElementById("down2").addEventListener("click", function() {
    downloadFile(document.getElementById("slide2").src);
})
document.getElementById("down3").addEventListener("click", function() {
    downloadFile(document.getElementById("slide3").src);
})

const waitTime = 2000;
/* EDIT BUTTONS */
document.getElementById("edit1").addEventListener("click", async function() {
    const file = await selectJpgFile();
    Promise.resolve(uploadImage(file, 1)).then((r) => {
        loadImages();
    })
})
document.getElementById("edit2").addEventListener("click", async function() {
    const file = await selectJpgFile();
    Promise.resolve(uploadImage(file, 2)).then((r) => {
        loadImages();
    })
})
document.getElementById("edit3").addEventListener("click", async function() {
    const file = await selectJpgFile();
    Promise.resolve(uploadImage(file, 3)).then((r) => {
        loadImages();
    })
})

/* CHANGE ELEMENT TITLE */
document.getElementById('inputTitle').addEventListener('blur', function() {
    changeTitle(this.value);
    changeProduct('-NRZZleNN9VvD7hEiV1O', 1)
})

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

function uploadImage(file, num) {
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

function changeTitle(title) {
    if(title == '') {title = 'Destaques'}
    const value = {
        "title": title,
    };
    firebase.database().ref('custom/carousel/').update(value);
}

function changeProduct(id, num) {
    var product = 'product'+num;
    const value = {
        [product]: id
    };
    firebase.database().ref('custom/carousel/').update(value);
}

import {
    changeSwitchValue,
    loadSwitch,
    loadCarouselProduct,
    getCarouselProduct,
    uploadSlideFile,
    getSlideSrc,
    changeCarouselTitle,
    loadCarouselTitle,
    changeCarouselProduct
} from '../data/customizationFunctions.js';

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
    uploadSlideFile(file, 1);
    loadSlide(1);
})
document.getElementById("edit2").addEventListener("click", async function() {
    const file = await selectJpgFile();
    uploadSlideFile(file, 2);
    loadSlide(2);
})
document.getElementById("edit3").addEventListener("click", async function() {
    const file = await selectJpgFile();
    uploadSlideFile(file, 3);
    loadSlide(3);
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

/* LOAD SLIDES FROM DATA */
function loadSlide(num) {
    getSlideSrc(num).then((val) => {
        document.getElementById("slide"+num).src = val;
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

function downloadFile(url) {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
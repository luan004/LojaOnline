import {createProduct, updateProduct, deleteProduct} from '../data/productCRUD.js';
import {formatPrice, formatProductName} from '../others/formats.js';

loadList();


/* PRODUCT FORM */
document.getElementById("name").addEventListener("blur", function(){
    this.value = formatProductName(this.value);
});
document.getElementById("price").addEventListener("input", function() {
    this.value = formatPrice(this.value);
});
document.getElementById('idForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var price = parseFloat(document.getElementById('price').value);
    var description = document.getElementById('description').value;
    var category = document.getElementById('category').value;
    var stock = parseInt(document.getElementById('stock').value);

    var image = document.getElementById('image');

    if (name != '' && price != '0.00' && price != '' && description != '' && image.files.length && category != '' && stock != '') {
        createProduct(name,price,description,category,image,stock);
        //document.getElementById('idForm').reset();
        document.getElementById('idErrorLabel').innerHTML = '';
        setTimeout(function() {
            loadList();
            openAddProduct();
        }, 500);
    } else {
        document.getElementById('idErrorLabel').innerHTML = '<span>Preencha todos os campos corretamente!</span>';
    }
});

/* FILTERS FORM */
document.getElementById('filtersForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const filterby = document.getElementById('filterby').value;
    const filterText = document.getElementById('filterText').value

    if (filterText != '') {
        loadList(filterby, filterText);
    } else {
        loadList();
    }
})

/* LIST */
function loadList(filterBy = '', filterValue = '') {
    firebase.database().ref('products').once('value')
    .then(snapshot => {
        const products = snapshot.val();
        const productList = document.getElementById('productList');
        productList.innerHTML = '';
    
        for (const productKey in products) {
            const product = products[productKey];
            let isFiltered = false;
    
            if (filterBy && filterValue) {
                if (product[filterBy].toString().toLowerCase().includes(filterValue.toLowerCase())) {
                isFiltered = true;
                }
            }
    
            if (!filterBy || isFiltered) {
                // Cria um item na lista
                const listItem = document.createElement('li');
                listItem.classList.add("product");
    
                // Cria imagem
                const image = document.createElement('img');
                image.src = product.image;
                image.classList.add("image");
                listItem.appendChild(image);
    
                // Cria firstInfos
                const firstInfos = document.createElement('div');
                firstInfos.classList.add("firstInfos");
                listItem.appendChild(firstInfos);
    
                // Cria nome
                const name = document.createElement('label');
                name.classList.add("first");
                name.innerText = product.name;
                firstInfos.appendChild(name);
    
                // Cria description
                const description = document.createElement('label');
                description.classList.add("first");
                description.classList.add("description");
                description.innerText = product.description;
                firstInfos.appendChild(description);
    
                // Cria label de price, stock, viewCount e likes
                const price = document.createElement('label');
                price.classList.add("first");
                price.classList.add("price");
                price.innerText = 'R$'+product.price.toString().replace('.', ',') + ' | ' + product.stock + ' unidades | ' + product.viewCount + ' visualizações | ' + product.likes + ' likes';
                firstInfos.appendChild(price);
    
                // Cria key label
                const keyLabel = document.createElement('label');
                keyLabel.classList.add("first");
                keyLabel.classList.add("key");
                keyLabel.innerText = productKey;
                firstInfos.appendChild(keyLabel);

                // Cria edit button
                const ebutton = document.createElement('div');
                ebutton.classList.add("erbutton");
                listItem.appendChild(ebutton);

                ebutton.addEventListener('click', function() {
                    editButtonAction(productKey, product.name, product.description, product.price, product.stock, product.category, product.image);
                });

                // Cria svg
                const esvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                esvg.setAttribute("viewBox", "0 96 960 960");
                esvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                esvg.classList.add("svgIcon");
                ebutton.appendChild(esvg);
                const esvgPath1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                esvgPath1.setAttribute("d", "M191.539 870.615h40.539l442.23-441.846-40.923-40.923-441.846 442.231v40.538Zm578.998-474.461L666 291.618l42-42q13.154-13.154 32.192-13.154t32.191 13.154l40.154 40.153q13.153 13.154 12.961 32.192-.192 19.038-13.346 32.576l-41.615 41.615Zm-32 31.615-488.229 488.23H146.156V811.846l488.229-488.229 104.152 104.152Zm-84.69-19.846-20.462-20.077 40.923 40.923-20.461-20.846Z");
                esvg.appendChild(esvgPath1);

                // Cria remove button
                const rbutton = document.createElement('div');
                rbutton.classList.add("erbutton");
                listItem.appendChild(rbutton);

                rbutton.addEventListener('click', function() {
                    deleteButtonAction(productKey);
                });
        
                // Cria svg
                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("viewBox", "0 96 960 960");
                svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                svg.classList.add("svgIcon");
                rbutton.appendChild(svg);
                const svgPath1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                svgPath1.setAttribute("d", "M278.309 915.999q-23.529 0-40.611-17.082-17.081-17.082-17.081-40.611V314.078h-17.924q-9.663 0-16.177-6.567-6.515-6.567-6.515-16.307 0-9.741 6.515-16.126 6.514-6.384 16.177-6.384h148.384q0-12.231 8.438-20.154 8.437-7.923 20.408-7.923h200.154q11.971 0 20.408 8.053 8.438 8.053 8.438 20.024h148.384q9.663 0 16.177 6.567 6.515 6.566 6.515 16.307t-6.515 16.125q-6.514 6.385-16.177 6.385h-17.924v544.228q0 23.529-17.081 40.611-17.082 17.082-40.611 17.082H278.309ZM266 314.078v544.228q0 5.385 3.654 8.847 3.655 3.462 8.655 3.462h403.382q5 0 8.655-3.462 3.654-3.462 3.654-8.847V314.078H266Zm115.232 449.384q0 9.663 6.566 16.177 6.567 6.515 16.308 6.515 9.74 0 16.125-6.515 6.384-6.514 6.384-16.177V420.231q0-9.288-6.566-15.99-6.567-6.702-16.308-6.702-9.74 0-16.125 6.702-6.384 6.702-6.384 15.99v343.231Zm152.153 0q0 9.663 6.566 16.177 6.567 6.515 16.308 6.515 9.74 0 16.125-6.515 6.384-6.514 6.384-16.177V420.231q0-9.288-6.566-15.99-6.567-6.702-16.308-6.702-9.74 0-16.125 6.702-6.384 6.702-6.384 15.99v343.231ZM266 314.078v544.228q0 5.385 3.654 8.847 3.655 3.462 8.655 3.462H266V314.078Z");
                svg.appendChild(svgPath1);
    
                // Adiciona o item na lista
                productList.appendChild(listItem);
            }
        }
    })
    .catch(error => {
        console.error(error);
    });
}


/* BUTTON ACTIONS */
function deleteButtonAction(key) {
    const confirm = document.getElementById('confirm');
    confirm.classList.add('confirmOpened');

    const confirmBox = document.createElement('div');
    confirmBox.classList.add("confirmBox");
    confirm.appendChild(confirmBox);

    const label = document.createElement('label');
    label.innerHTML = 'Você tem certeza que quer apagar esse item?'
    confirmBox.appendChild(label);

    const conButs = document.createElement('div');
    conButs.classList.add("conButs");
    confirmBox.appendChild(conButs);

    const conYes = document.createElement('div');
    conYes.innerHTML = 'Sim';
    conYes.classList.add("conBut");
    conButs.appendChild(conYes);

    const conNo = document.createElement('div');
    conNo.innerHTML = 'Não';
    conNo.classList.add("conBut");
    conButs.appendChild(conNo);
    
    conYes.addEventListener('click', function() {
        deleteProduct(key);
        confirm.innerHTML = "";
        confirm.setAttribute('style', 'display:none;');
        loadList();
    })

    conNo.addEventListener('click', function() {
        confirm.innerHTML = "";
        confirm.classList.remove('confirmOpened');
    })
}
function editButtonAction(key, name, description, price, stock, category, image) {
    const confirm = document.getElementById('confirm');
    confirm.classList.add('confirmOpened');

    //confirm.setAttribute("style", 'display: block;background-color: rgba(0, 0, 0, 0.788);');

    const confirmBox = document.createElement('div');
    confirmBox.classList.add("editBox");
    confirm.appendChild(confirmBox);

    //elements ---
    const inputNameLabel = document.createElement('label');
    inputNameLabel.innerHTML = 'Nome:';
    confirmBox.appendChild(inputNameLabel);
    const inputName = document.createElement('input');
    inputName.setAttribute("type", 'text');
    inputName.value = name;
    confirmBox.appendChild(inputName);

    const inputPriceLabel = document.createElement('label');
    inputPriceLabel.innerHTML = 'Preço:';
    confirmBox.appendChild(inputPriceLabel);
    const inputPrice = document.createElement('input');
    inputPrice.setAttribute("type", 'text');
    inputPrice.value = price;
    confirmBox.appendChild(inputPrice);
    inputPrice.addEventListener("input", function() {
        this.value = formatPrice(this.value);
    });

    const inputDescLabel = document.createElement('label');
    inputDescLabel.innerHTML = 'Descrição:';
    confirmBox.appendChild(inputDescLabel);
    const inputDesc = document.createElement('input');
    inputDesc.setAttribute("type", 'text');
    inputDesc.value = description;
    confirmBox.appendChild(inputDesc);

    const inputCatLabel = document.createElement('label');
    inputCatLabel.innerHTML = 'Categoria:';
    confirmBox.appendChild(inputCatLabel);
    const inputCat = document.createElement('input');
    inputCat.setAttribute("type", 'text');
    inputCat.value = category;
    confirmBox.appendChild(inputCat);

    const inputDiscountLabel = document.createElement('label');
    inputDiscountLabel.innerHTML = 'Desconto(%):';
    confirmBox.appendChild(inputDiscountLabel);
    const inputDiscount = document.createElement('input');
    inputDiscount.setAttribute("type", 'text');
    inputDiscount.value = stock + '%';
    confirmBox.appendChild(inputDiscount);

    const inputStockLabel = document.createElement('label');
    inputStockLabel.innerHTML = 'Quantidade em Estoque:';
    confirmBox.appendChild(inputStockLabel);
    const inputStock = document.createElement('input');
    inputStock.setAttribute("type", 'text');
    inputStock.value = stock;
    confirmBox.appendChild(inputStock);

    //buttons ---
    const conButs = document.createElement('div');
    conButs.classList.add("conButs");
    confirmBox.appendChild(conButs);

    const conYes = document.createElement('div');
    conYes.innerHTML = 'Aplicar Edição';
    conYes.classList.add("conBut");
    conButs.appendChild(conYes);

    const conNo = document.createElement('div');
    conNo.innerHTML = 'Cancelar';
    conNo.classList.add("conBut");
    conButs.appendChild(conNo);

    conYes.addEventListener('click', function() {
        updateProduct(key, 'name', inputName.value);
        updateProduct(key, 'price', inputPrice.value);
        updateProduct(key, 'description', inputDesc.value);
        updateProduct(key, 'category', inputCat.value);
        //updateProduct(key, 'discount', inputName.value);
        updateProduct(key, 'stock', inputStock.value);

        confirm.innerHTML = "";
        confirm.setAttribute('style', 'display:none;');
        loadList();
    })

    conNo.addEventListener('click', function() {
        confirm.innerHTML = "";
        confirm.classList.remove('confirmOpened');
    })
    
}
document.getElementById('openAddProduct').addEventListener('click', function(){
    openAddProduct();
});
var oa = false;
function openAddProduct() {
    if (oa == false) {
        document.getElementById("addOpen").classList.add('addOpened');
        oa=true;
    } else {
        document.getElementById("addOpen").classList.remove("addOpened");
        oa=false;
    }
}
loadList();

/* FORMAT PRODUCT NAME */
document.getElementById("name").addEventListener("blur", function(){
    this.value = formatProductName(this.value);
});

/* FORMAT PRICE */
document.getElementById("price").addEventListener("input", function() {
    this.value = formatPrice(this.value);
    console.log(this.value);
});


/* BUTTON ACTIONS */
function deleteButtonAction(key) {
    const confirm = document.getElementById('confirm');
    confirm.setAttribute("style", 'display: block;');

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
    //conYes.setAttribute("onclick", 'deleteProduct(\"' + key + '\")');
    conYes.innerHTML = 'Sim';
    conYes.classList.add("conBut");
    conButs.appendChild(conYes);

    const conNo = document.createElement('div');
    conNo.innerHTML = 'Não';
    conNo.classList.add("conBut");
    conButs.appendChild(conNo);
    
    conYes.addEventListener('click', function() {
        console.log('deletado');
    })

    conNo.addEventListener('click', function() {
        console.log('nao');
    })
}

var oa = false;
function openAddProduct() {
    if (oa == false) {
        document.getElementById("addAdminOpen").classList.add('addAdminOpened');
        oa=true;
    } else {
        document.getElementById("addAdminOpen").classList.remove("addAdminOpened");
        oa=false;
    }
}

/* CREATE PRODUCT */
document.getElementById('idForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var price = document.getElementById('price').value;
    var description = document.getElementById('description').value;
    var category = document.getElementById('category').value;
    var stock = document.getElementById('stock').value;
    var image = document.getElementById('image').value;

    if (name != '' && price != '0.00' && price != ''&& description != '' && image != '' && category != '' && stock != '') {
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


/* LOAD PRODUCTS LIST */
function loadList() {
    firebase.database().ref('products').once('value')
    .then(snapshot => {
        const products = snapshot.val();
        const productList = document.getElementById('productList');
        productList.innerHTML = '';
    
        for (const productKey in products) {
            const product = products[productKey];
            
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
            price.innerText = 'R$'+product.price.replace('.', ',') + ' | ' + product.stock + ' unidades | ' + product.viewCount + ' visualizações | ' + product.likes + ' likes';
            firstInfos.appendChild(price);
    
            // Cria key label
            const keyLabel = document.createElement('label');
            keyLabel.classList.add("first");
            keyLabel.classList.add("key");
            keyLabel.innerText =productKey;
            firstInfos.appendChild(keyLabel);
    
            // Cria remove button
            const button = document.createElement('div');
            button.setAttribute("onclick", 'deleteButtonAction(\"' + productKey + '\")');
            button.classList.add("removeAdminButton");
            listItem.appendChild(button);
    
            // Cria svg
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 96 960 960");
            svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svg.classList.add("svgIcon");
            button.appendChild(svg);
    
            const svgPath1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            svgPath1.setAttribute("d", "M278.309 915.999q-23.529 0-40.611-17.082-17.081-17.082-17.081-40.611V314.078h-17.924q-9.663 0-16.177-6.567-6.515-6.567-6.515-16.307 0-9.741 6.515-16.126 6.514-6.384 16.177-6.384h148.384q0-12.231 8.438-20.154 8.437-7.923 20.408-7.923h200.154q11.971 0 20.408 8.053 8.438 8.053 8.438 20.024h148.384q9.663 0 16.177 6.567 6.515 6.566 6.515 16.307t-6.515 16.125q-6.514 6.385-16.177 6.385h-17.924v544.228q0 23.529-17.081 40.611-17.082 17.082-40.611 17.082H278.309ZM266 314.078v544.228q0 5.385 3.654 8.847 3.655 3.462 8.655 3.462h403.382q5 0 8.655-3.462 3.654-3.462 3.654-8.847V314.078H266Zm115.232 449.384q0 9.663 6.566 16.177 6.567 6.515 16.308 6.515 9.74 0 16.125-6.515 6.384-6.514 6.384-16.177V420.231q0-9.288-6.566-15.99-6.567-6.702-16.308-6.702-9.74 0-16.125 6.702-6.384 6.702-6.384 15.99v343.231Zm152.153 0q0 9.663 6.566 16.177 6.567 6.515 16.308 6.515 9.74 0 16.125-6.515 6.384-6.514 6.384-16.177V420.231q0-9.288-6.566-15.99-6.567-6.702-16.308-6.702-9.74 0-16.125 6.702-6.384 6.702-6.384 15.99v343.231ZM266 314.078v544.228q0 5.385 3.654 8.847 3.655 3.462 8.655 3.462H266V314.078Z");
            svg.appendChild(svgPath1);
            
            // Adiciona o item na lista
            productList.appendChild(listItem);
        }
    })
    .catch(error => {
        console.error(error);
    });
}
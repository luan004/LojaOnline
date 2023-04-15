loadList();


/* CUIDADO AO EXECUTAR, DIVEROS PRODUTOS SERÃO CRIADOS!!! */
/* const produtos = ["iPhone 13", "Samsung Galaxy S21", "OnePlus 9 Pro", "Xiaomi Mi 11", "Google Pixel 6", "Motorola Moto G Stylus", "Nokia 5.4", "LG K92", "Dell XPS 13", "HP Spectre x360", "Lenovo ThinkPad X1 Carbon", "Sony WH-1000XM4", "Bose QuietComfort 35 II", "Apple AirPods Pro", "Samsung Galaxy Buds Pro", "ASUS ROG Swift PG279QZ", "Acer Predator XB273K", "PlayStation 5", "Xbox Series X", "Alienware Aurora R12"];
const categorias = ["smartphones", "smartphones", "smartphones", "smartphones", "smartphones", "smartphones", "smartphones", "smartphones", "notebooks", "notebooks", "notebooks", "headphones", "headphones", "headphones", "headphones", "monitores", "monitores", "videogames", "videogames", "gamer"];
const descricoes = [
    "O mais recente lançamento da Apple com câmera aprimorada.",
    "Excelente tela com uma câmera profissional.",
    "Excelente desempenho em jogos e tela de 120Hz.",
    "Câmera potente e ótimo desempenho em geral.",
    "Inteligência artificial em fotos e excelente experiência Android.",
    "Ótima opção de smartphone para quem precisa de um caneta stylus.",
    "Design clássico e boa relação custo-benefício.",
    "Bom processamento para uso diário e preço acessível.",
    "O melhor laptop da Dell com excelente design e desempenho.",
    "Laptop premium com excelente tela touch e bateria.",
    "Laptop empresarial ultra-portátil com alta durabilidade.",
    "Headphone com cancelamento de ruído líder de mercado.",
    "Headphone confortável com cancelamento de ruído decente.",
    "Auriculares totalmente sem fio com cancelamento de ruído e som de alta qualidade.",
    "Auriculares totalmente sem fio com cancelamento de ruído e boa duração da bateria.",
    "Monitor com alta taxa de atualização e baixo tempo de resposta.",
    "Monitor 4K com excelente qualidade de imagem e cores vibrantes.",
    "Console de última geração com excelente desempenho e qualidade de imagem.",
    "Console de última geração com excelente desempenho e ótimo controle.",
    "Poderoso PC para jogos com iluminação RGB personalizável."
];
var c = 0;

while(c < 20) {
    createProduct(produtos[c], 999.99, descricoes[c], categorias[c], 'https://source.unsplash.com/random?'+produtos[c], 100)
    c++;
} */
  

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
        confirm.setAttribute('style', 'display:none;');
    })
}

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

/* CREATE PRODUCT */
document.getElementById('idForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var price = parseFloat(document.getElementById('price').value);
    var description = document.getElementById('description').value;
    var category = document.getElementById('category').value;
    var stock = parseInt(document.getElementById('stock').value);
    var image = document.getElementById('image').value;

    if (name != '' && price != '0.00' && price != '' && description != '' && image != '' && category != '' && stock != '') {
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
        }
    })
    .catch(error => {
        console.error(error);
    });
}
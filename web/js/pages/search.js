import {readProduct} from '../data/productCRUD.js';
import {getData} from '../data/customFunctions.js';

var url = new URL(window.location.href);
var searchTerm = url.searchParams.get("s");

document.getElementById('searchTerm').innerHTML = searchTerm;
var category = document.getElementById('categorySelect').value;

document.getElementById('applyFilters').addEventListener('click', function() {
    category = document.getElementById('categorySelect').value;
    loadList('name', searchTerm, category);
})

loadList('name', searchTerm)
/* LIST */
function loadList(filterBy = '', filterValue = '', category = '') {
    firebase.database().ref('products').once('value')
        .then(snapshot => {
            const products = snapshot.val();
            const productList = document.getElementById('list');
            let numProducts = 0;
            list.innerHTML = '<div class="d-flex p-2 m-3 border-bottom"><strong id="numProducts"></strong></div>';

            for (const productKey in products) {
                const product = products[productKey];
                let isFiltered = false;

                if (filterBy && filterValue) {
                    const regex = new RegExp(filterValue.toLowerCase().split(' ').join('.*'), 'g');
                    const productText = `${product.name} ${product.description} ${product.category}`.toLowerCase();
                    if (regex.test(productText)) {
                        isFiltered = true;
                    }
                }

                if (category && product.category.toLowerCase() !== category.toLowerCase()) {
                    isFiltered = false;
                }

                if (!filterBy || isFiltered) {
                    createListItem(productKey, product);
                    numProducts++;
                }
            }

            document.getElementById('numProducts').innerHTML = numProducts + ' produtos encontrados';
        });
}

  

function createListItem(key, product) {

    const price = product.price.toFixed(2).toString().replace('.', ',');
    const newPrice = (product.price - (product.discount/100 * product.price)).toFixed(2).toString().replace('.', ',');

    var priceString;
    if (product.discount == 0) {
        priceString = price;
    } else {
        priceString = newPrice + ' <del style="color:#880000;" class="h6">R$'+price+'</del>';
    }

    const card = `
    <div class="card mb-3">
        <div class="row p-0 m-0">
            <div class="col-sm-3 col-4 p-0 m-0">
                <a href="./product?p=` + key + `" class="rounded overflow-hidden">
                    <img src="` + product.image + `" class="w-100 border-end">
                </a>
            </div>
            <div class="col-sm-9 col-8 pt-2">
                <a href="./product?p=` + key + `"class="d-block h4 text-truncate">` + product.name + `</a>
                <p class="line-clamp justify">` + product.description + `</p>
                <span class="badge text-bg-secondary">`+ product.category+`</span>

                <div class="position-absolute bottom-0 mb-2 fill-available me-2 pt-2 bg-white">
                    <h4 class="me-auto mb-2 text-truncate">R$` + priceString + `</h4>
                </div>
            </div>
        </div>
    </div>
  `;
  document.getElementById('list').innerHTML += card;
}


removeStopWords(searchTerm);
function increaseSearchStat(searchTerm) {
    firebase.database().ref('search_stats/' + searchTerm).transaction(function(snapshot) {
        // Verifique se o nó já existe no Firebase
        if (snapshot === null) {
            // Se não existir, crie um novo nó com um contador igual a 1
            return {count: 1};
        } else {
            // Se já existir, incremente o contador em 1
            snapshot.count++;
            return snapshot;
        }
    });
}

function removeStopWords(string) {
    let s = string.toLowerCase();

    // Remover acentos e pontuacoes  
    s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]/gi, '');

    const stopWords = ['de','a','o','que','e','do','da','em','um','para','e','com','nao','uma','os','no','se','na','por','mais','as','dos','como','mas','foi','ao','ele','das','tem','a','seu','sua','ou','ser','quando','muito','ha','nos','ja','esta','eu','tambem','so','pelo','pela','ate','isso','ela','entre','era','depois','sem','mesmo','aos','ter','seus','quem','nas','me','esse','eles','estao','voce','tinha','foram','essa','num','nem','suas','meu','as','minha','tem','numa','pelos','elas','havia','seja','qual','sera','nos','tenho','lhe','deles','essas','esses','pelas','este','fosse','dele','tu','te','voces','vos','lhes','meus','minhas','teu','tua','teus','tuas','nosso','nossa','nossos','nossas','dela','delas','esta','estes','estas','aquele','aquela','aqueles','aquelas','isto','aquilo','estou','esta','estamos','estao','estive','esteve','estivemos','estiveram','estava','estavamos','estavam','estivera','estiveramos','esteja','estejamos','estejam','estivesse','estivessemos','estivessem','estiver','estivermos','estiverem','hei','ha','havemos','hao','houve','houvemos','houveram','houvera','houveramos','haja','hajamos','hajam','houvesse','houvessemos','houvessem','houver','houvermos','houverem','houverei','houvera','houveremos','houverao','houveria','houveriamos','houveriam','sou','somos','sao','era','eramos','eram','fui','foi','fomos','foram','fora','foramos','seja','sejamos','sejam','fosse','fossemos','fossem','for','formos','forem','serei','sera','seremos','serao','seria','seriamos','seriam','tenho','tem','temos','tem','tinha','tinhamos','tinham','tive','teve','tivemos','tiveram','tivera','tiveramos','tenha','tenhamos','tenham','tivesse','tivessemos','tivessem','tiver','tivermos','tiverem','terei','tera','teremos','terao','teria','teriamos','teriam', 'sobre'];

    // Dividir a string em um array de palavras
    const words = s.split(' ');

    // Remover stop words
    const wordsWithoutStopWords = words.filter(word => !stopWords.includes(word));

    // Chamar funcao increaseSearchStat para cada
    wordsWithoutStopWords.forEach(word => increaseSearchStat(word));
}
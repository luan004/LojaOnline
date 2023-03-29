startData();

var url = new URL(window.location.href);
var searchTerm = url.searchParams.get("s");
console.log(searchTerm);

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
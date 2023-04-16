/*  */

/* PRODUCTS */
getNumChildren('products').then((val) => {
    document.getElementById("idQtdeProducts").innerHTML = val;
});
getProductMost('likes').then((val) => {
    document.getElementById("idMostLiked").innerHTML = val;
});
getProductMost('viewCount').then((val) => {
    document.getElementById("idMostViewed").innerHTML = val;
});

/* ADMINS */
getNumChildren('admins').then((val) => {
    document.getElementById("idQtdeAdmins").innerHTML = val;
});
getMediumAge().then((val) => {
    document.getElementById("medAge").innerHTML = val + ' anos';
});


/* defineMostSearched();

defineQtdeProducts();
defineMostLiked();
defineMostViewed();
defineQtdeAdmins();

function defineMostSearched() {
    firebase.database().ref('search_stats').once('value').then(function(snapshot) {
    var mostSearchedTerm = '';
    var highestCount = 0;
        snapshot.forEach(function(childSnapshot) {
            var term = childSnapshot.key;
            var count = childSnapshot.val().count;
            if (count > highestCount) {
            highestCount = count;
            mostSearchedTerm = term;
            }
        });
        document.getElementById("valueMostSearch").innerHTML = '\"'+mostSearchedTerm+'\"';
    });
}

function defineMostLiked() {
    firebase.database().ref('products').orderByChild('likes').limitToLast(1).once('value')
        .then((snapshot) => {
            const product = snapshot.val();
            const productName = Object.values(product)[0].name;
            document.getElementById("idMostLiked").innerHTML = productName;
        })
        .catch((error) => {
            console.error('Error getting product with most likes:', error);
            document.getElementById("idMostLiked").innerHTML = 'undef';
    });
}

function defineMostViewed() {
    firebase.database().ref('products').orderByChild('viewCount').limitToLast(1).once('value')
        .then((snapshot) => {
            const product = snapshot.val();
            const productName = Object.values(product)[0].name;
            document.getElementById("idMostViewed").innerHTML = productName;
        })
        .catch((error) => {
            console.error('Error getting product with most likes:', error);
            document.getElementById("idMostViewed").innerHTML = 'undef';
    });
}


function defineQtdeAdmins() {
    firebase.database().ref('admins').once('value', function(snapshot) {
        document.getElementById("idQtdeAdmins").innerHTML = snapshot.numChildren();
    });
}

function defineQtdeProducts() {
    firebase.database().ref('products').once('value', function(snapshot) {
        document.getElementById("idQtdeProducts").innerHTML = snapshot.numChildren();
    });
} */
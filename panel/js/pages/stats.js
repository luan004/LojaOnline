import {
    getNumChildren,
    getMediumAge,
    getProductMost
} from '../data/statsFunctions.js';

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
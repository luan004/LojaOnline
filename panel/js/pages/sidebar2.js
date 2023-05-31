var page = window.location.pathname;
var tab;

switch (true) {
  case page.includes('stats'):
    tab = 'stats';
    break;
  case page.includes('custom'):
    tab = 'custom';
    break;
  case page.includes('produtos'):
    tab = 'produtos';
    break;
  case page.includes('clientes'):
    tab = 'clientes';
    break;
  case page.includes('admins'):
    tab = 'admins';
    break;
}

if (tab) {
  document.getElementById(tab).classList.add('active');
}
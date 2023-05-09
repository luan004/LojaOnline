var page = window.location.pathname;
var tab;

switch (true) {
  case page.includes('myaccount'):
    tab = 'myaccount';
    break;
  case page.includes('cart'):
    tab = 'cart';
    break;
  case page.includes('pedidos'):
    tab = 'pedidos';
    break;
  case page.includes('payment'):
    tab = 'payment';
    break;
  case page.includes('settings'):
    tab = 'settings';
    break;
  default:
    console.error('Invalid page path');
}

if (tab) {
  document.getElementById(tab).classList.add('active');
}
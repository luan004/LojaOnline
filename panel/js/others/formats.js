function formatName(name) {
    name = name.replace(/[0-9]/g, "").replace(/\s{2,}/g, " ").toLowerCase();
    name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return name;
}

function formatUser(user) {
    user = user.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const maxLength = 22;
    if (user.length <= maxLength) {
      return user;
    } else {
      return user.substring(0, maxLength);
    }
}

function formatPassword(pass) {
  pass = pass.replace(/\s/g, '');
  const maxLength = 22;
  if (pass.length <= maxLength) {
    return pass;
  } else {
    return pass.substring(0, maxLength);
  }
}

function formatCpf(cpf) {
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return cpf;
}

function formatPrice(price, cents) {
  price = price.replace(/\D/g, "");
  cents = Number(price);
  return (cents / 100).toFixed(2);
}

function formatProductName(name) {
  name = name.replace(/\s{2,}/g, " ");
  name = name.trim();
  return name;
}

function formatBorn(date) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

function calcAge(date) {
  var birthDate = new Date(date);
  var today = new Date();
  var age = today.getFullYear() - birthDate.getFullYear();
  var monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}
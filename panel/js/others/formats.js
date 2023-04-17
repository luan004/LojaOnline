export function formatName(name) {
    name = name.replace(/[0-9]/g, "").replace(/\s{2,}/g, " ").toLowerCase();
    name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return name;
}

export function formatUser(user) {
    user = user.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const maxLength = 22;
    if (user.length <= maxLength) {
      return user;
    } else {
      return user.substring(0, maxLength);
    }
}

export function formatPassword(pass) {
  pass = pass.replace(/\s/g, '');
  const maxLength = 22;
  if (pass.length <= maxLength) {
    return pass;
  } else {
    return pass.substring(0, maxLength);
  }
}

export function formatCpf(cpf) {
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return cpf;
}

export function formatPrice(value) {
  // Remove todos os caracteres que não são números
  value = value.replace(/\D/g, "");
  // Apaga os zeros a esquerda caso o valor tenha mais de 3 caracteres
  if (value.length > 2) {
    value = value.replace(/^0+/, "");
  }
  // Completa com zeros à esquerda até alcançar 3 caracteres
  while (value.length < 3) {
    value = "0" + value;
  }
  // Adiciona um ponto antes dos dois últimos caracteres
  if (value.length >= 3) {
    value = value.slice(0, -2) + "." + value.slice(-2);
  }
  return value;
}

export function formatNumber(value) {
  if (value.length <= 3) {
    value = value.padStart(3, "0");
  } else {
    value = value.replace(/^0+/, "");
  }
  if (value.length > 3) {
    value = value.replace(/(\d{2})$/, ".$1");
  }
  return value;
}

export function formatProductName(name) {
  name = name.replace(/\s{2,}/g, " ");
  name = name.trim();
  return name;
}

export function formatBorn(date) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

export function calcAge(date) {
  var birthDate = new Date(date);
  var today = new Date();
  var age = today.getFullYear() - birthDate.getFullYear();
  var monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

export function getDate() {
  const now = new Date();
  const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const weekDay = weekDays[now.getDay()];
  const monthDay = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  return `${weekDay}, ${monthDay} de ${month} de ${year}`;
}

export function getTime(element) {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}<label class="milisecond">,${second.toString().padStart(2, '0')}</label>`;
}

export function downloadFile(url) {
  // Cria um elemento <a> para simular o clique em um link de download
  const link = document.createElement("a");
  link.href = url;

  // Define o atributo 'download' para indicar que o arquivo deve ser baixado e não aberto no navegador
  link.setAttribute("download", "");

  // Dispara o clique no link
  document.body.appendChild(link);
  link.click();

  // Remove o elemento <a> depois que o download é iniciado
  document.body.removeChild(link);
}
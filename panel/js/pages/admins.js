loadList();

/* FORMAT NAME */
document.getElementById("name").addEventListener("input", function() {
    this.value = formatName(this.value);
});
document.getElementById("name").addEventListener("blur", function() {
    this.value = this.value.trim();
});
/* FORMAT USERNAME */
document.getElementById('user').addEventListener('input', function() {
    this.value = formatUser(this.value);
});
/* FORMAT PASSWORD */
document.getElementById("password").addEventListener("input", function() {
    this.value = formatPassword(this.value);
});
document.getElementById("password2").addEventListener("input", function() {
    this.value = formatPassword(this.value);
});
/* FORMAT CPF */
document.getElementById("cpf").addEventListener("input", function() {;
    this.value = formatCpf(this.value);
});


/* VALIDATE AVATAR */
document.getElementById("avatar").addEventListener("change", function() {
    if (this.value && this.value.split(".").pop().toLowerCase() !== "jpg") {
        alert("Por favor, selecione um arquivo .jpg");
        this.value = "";
    }
});
/* VALIDATE USERNAME */
document.getElementById("user").addEventListener("blur", () => {
    checkIfAnUserExists(document.getElementById('user').value).then((result) => {
        if (result == true) {
            document.getElementById('user').value = '';
            document.getElementById('labelName').innerHTML = 'Nome de Usuário: <span>Este nome de usuário já está em uso!</span>';
        } else {
            document.getElementById('labelName').innerHTML = 'Nome de Usuário:';
        }
    });
});


/* BUTTON ACTIONS */
function buttonDeleteAdmin(user) {
    deleteAdmin(user);
    loadList();
}
function buttonEditAdmin() {
    window.location.replace('myaccount'); 
}
var oa = false;
function buttonShowForm() {
    if (oa == false) {
        document.getElementById("addAdminOpen").classList.add('addAdminOpened');
        oa=true;
    } else {
        document.getElementById("addAdminOpen").classList.remove("addAdminOpened");
        oa=false;
    }
}

/* CREATE ADMIN */
document.getElementById('idForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var user = document.getElementById('user').value;
    var pass = document.getElementById('password').value;
    var pass2 = document.getElementById('password2').value;
    var name = document.getElementById('name').value;
    var cpf = document.getElementById('cpf').value.replace(/\D+/g, '');
    var avatarForm = document.getElementById("avatar");
    var bornDate = document.getElementById('bornDate').value

    Promise.resolve(checkIfAnUserExists(user).then((result) => {
        if (user != '' && pass.length > 7 && pass == pass2 && name != '' && cpf.length == 11 && bornDate != '' && avatarForm.files.length && result == false) {
            createAdmin(user,pass,name,cpf,avatarForm,bornDate);
            document.getElementById('idErrorLabel').innerHTML = '';
            setTimeout(() => {
                console.log('carregando...');
                loadList();
                buttonShowForm();
            }, 1000);
            document.getElementById('idForm').reset();
        } else {
            document.getElementById('idErrorLabel').innerHTML = '<span>Preencha todos os campos corretamente!</span>';
        }
    }))
});

/* LOAD ADMINS LIST */
function loadList() {
    firebase.database().ref('admins').once('value')
    .then(snapshot => {
        const admins = snapshot.val();
        const adminList = document.getElementById('adminList');
        adminList.innerHTML = '';
        for (const adminKey in admins) {
            const admin = admins[adminKey];

            // Cria um item na lista
            const listItem = document.createElement('li');
            listItem.classList.add("admin");

            // Cria avatar
            const avat = document.createElement('img');
            avat.src = admin.avatar;
            avat.classList.add("avat");
            listItem.appendChild(avat);

            // Cria firstInfos
            const firstInfos = document.createElement('div');
            firstInfos.classList.add("firstInfos");
            listItem.appendChild(firstInfos);

            // Cria nome
            const name = document.createElement('label');
            name.classList.add("first");
            name.innerText = admin.name;
            firstInfos.appendChild(name);
            
            // Cria user
            const username = document.createElement('label');
            username.classList.add("first");
            username.classList.add("user");
            username.innerText = `${admin.user}`;
            firstInfos.appendChild(username);

            Promise.resolve(checkLogin(admin.user)).then((ret) => {
                if (!ret) {
                    // Cria remove button
                    const button = document.createElement('div');
                    button.setAttribute("onclick", 'buttonDeleteAdmin(\"' + admin.user + '\")');
                    button.classList.add("itemButton");
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

                } else {
                    // Cria edit button
                    const button = document.createElement('div');
                    button.setAttribute("onclick", 'buttonEditAdmin()');
                    button.classList.add("itemButton");
                    listItem.appendChild(button);

                    // Cria svg
                    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    svg.setAttribute("viewBox", "0 96 960 960");
                    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                    svg.classList.add("svgIcon");

                    button.appendChild(svg);
                    const svgPath1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    svgPath1.setAttribute("d", "M191.539 870.615h40.539l442.23-441.846-40.923-40.923-441.846 442.231v40.538Zm578.998-474.461L666 291.618l42-42q13.154-13.154 32.192-13.154t32.191 13.154l40.154 40.153q13.153 13.154 12.961 32.192-.192 19.038-13.346 32.576l-41.615 41.615Zm-32 31.615-488.229 488.23H146.156V811.846l488.229-488.229 104.152 104.152Zm-84.69-19.846-20.462-20.077 40.923 40.923-20.461-20.846Z");
                    svg.appendChild(svgPath1);
                }
            });
            // Adiciona o item na lista
            adminList.appendChild(listItem);
        }
    })
    .catch(error => {
        console.error(error);
    });
}
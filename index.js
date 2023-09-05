var usersList = {}

const getUsers = async () => {

    const res = await fetch("https://reqres.in/api/users/");
    const users = await res.json();

    usersList = users.data;

}

const alerts = (mensaje, color) => {
    Toastify({
        text: mensaje,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
            background: color,
        },
    }).showToast();
}

getUsers().then(() => {
    listUsers();
})

const listUsers = async () => {
    let tbody = document.getElementById("tbody")
    tbody.innerHTML = '';
    usersList.forEach(element => {


        let tr = document.createElement("tr")

        // id
        let id = document.createElement("td")
        let inputId = document.createElement('input');
        inputId.value = element.id;
        inputId.style.border = 'none';
        inputId.style.outline = 'none';
        inputId.name = element.id;
        tr.id = element.id;
        inputId.disabled = true
        id.appendChild(inputId)

        // email
        let email = document.createElement("td")
        let inputEmail = document.createElement('input');
        inputEmail.value = element.email;
        inputEmail.style.border = 'none';
        inputEmail.style.outline = 'none';
        inputEmail.name = element.email;
        email.appendChild(inputEmail)

        //first name
        let firstName = document.createElement("td")
        let inputFirstName = document.createElement('input');
        inputFirstName.value = element.first_name;
        inputFirstName.style.border = 'none';
        inputFirstName.style.outline = 'none';
        inputFirstName.name = element.first_name;
        firstName.appendChild(inputFirstName)

        //last name
        let lastName = document.createElement("td")
        let inputLastName = document.createElement('input');
        inputLastName.value = element.last_name;
        inputLastName.style.border = 'none';
        inputLastName.style.outline = 'none';
        inputLastName.name = element.last_name;
        lastName.appendChild(inputLastName);
        //profile pic
        let profilePic = document.createElement("img")
        profilePic.src = element.avatar;
        profilePic.width = 100;
        profilePic.height = 100;
        profilePic.id = "avatar"

        //delete
        let del = document.createElement("td")
        let btnDelete = document.createElement("button")
        btnDelete.innerText = "Borrar"
        btnDelete.className = "btn btn-danger"
        btnDelete.onclick = () => deleteUser(element.id);
        del.appendChild(btnDelete)

        //edit
        let edit = document.createElement("td")
        let btnEdit = document.createElement("button")
        btnEdit.innerText = "Editar"
        btnEdit.className = "btn btn-warning"
        btnEdit.onclick = () => editUser(element.id);
        edit.appendChild(btnEdit)

        tr.appendChild(id);
        tr.appendChild(email);
        tr.appendChild(firstName);
        tr.appendChild(lastName);
        tr.appendChild(profilePic);
        tr.appendChild(del);
        tr.appendChild(edit);
        tbody.appendChild(tr);
    });
}


const deleteUser = (id) => {
    console.log(id);
    usersList = usersList.filter(user => user.id != id);
    let url = "https://reqres.in/api/users/" +id;
    fetch(url, {
        method: 'DELETE'
    }).then((res) => {
        console.log(res);
        alerts("Se elimino correctamente", "linear-gradient(to right, #00b09b, #96c93d)");
    })
    
    listUsers();
}

const editUser = (id) => {
    const tr = document.getElementById(id);
    let inputs = []
    for (const child of tr.children) {
        let input = child.getElementsByTagName('input');
        if (input.length > 0) {
            inputs.push(input);
        }
    }

    const data = {
        id: parseInt(inputs[0].item(0).value),
        email: inputs[1].item(0).value,
        first_name: inputs[2].item(0).value,
        last_name: inputs[3].item(0).value,
        avatar: tr.childNodes.item(4).src
    }

    const i = usersList.findIndex(x => x.id === data.id)
    usersList[i] = data
    let url = "https://reqres.in/api/users/" +id;
    fetch(url, {
        method: 'PUT'
    }, {
        body : JSON.stringify({
            name: data.first_name,
            job: "Developer"
        })
    }).then((res)=> {
        console.log(res);
        alerts("Se edito correctamente", "linear-gradient(to right, #00b09b, #96c93d)");
    })
    
    listUsers();
}

const registrar = () => {
    let name = document.getElementById("emailCreate").value
    let job = document.getElementById("jobCreate").value

    let user = {
        name: name,
        job: job
    }
    fetch("https://reqres.in/api/users", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          }
    }, {
        body: JSON.stringify(user)
    }).then((res)=> {
        alerts("Se creo correctamente", "linear-gradient(to right, #00b09b, #96c93d)");
    })
}
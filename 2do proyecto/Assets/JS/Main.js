// Función para validar formulario
function validateForm() {
    // Obtener los valores en los campos
    let name = document.getElementById('inputName').value.trim();
    let email = document.getElementById('inputEmail').value.trim();
    let phone = document.getElementById('inputPhone').value.trim();

    // Validar campo Nombre
    if (name === "") {
        alert('Por favor, ingrese el Nombre y Apellido');
        return false;
    }

    // Validar campo correo
    if (email === "") {
        alert('Se requiere ingresar un e-mail');
        return false;
    } else if (!email.includes("@")) {
        alert('El correo ingresado no es válido');
        return false;
    }

    // Validar campo número de teléfono
    if (phone === "") {
        alert('Se requiere el ingreso de un nro. de teléfono');
        return false;
    }

    // Si pasa las validaciones
    return true;
}

// Función para agregar data
function addData() {
    if (validateForm()) {
        let { name, email, phone } = getFormValues();

        let listPeople = JSON.parse(localStorage.getItem('listPeople')) || [];

        if (!Array.isArray(listPeople)) {
            listPeople = []; // Si no es un array válido, inicializamos uno nuevo
        }

        listPeople.push({
            name: name,
            email: email,
            phone: phone,
        });

        // Agregar al local storage
        localStorage.setItem('listPeople', JSON.stringify(listPeople));

        // Para mostrar la data
        showData();

        // Limpiar los campos
        clearFields();

        // Cambiar la visualización de los botones
        document.getElementById('btnAdd').style.display = 'block';
        document.getElementById('btnUpdate').style.display = 'none';
    }
}

// Función para mostrar data
function showData() {
    let listPeople = JSON.parse(localStorage.getItem('listPeople')) || [];

    if (!Array.isArray(listPeople)) {
        listPeople = [];
    }

    let html = "";
    listPeople.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.phone + "</td>";
        html += '<td><button onclick="updateData(' + index + ')" class="btn btn-info">Editar</button><button onclick="deleteData(' + index + ')" class="btn btn-danger" id="btnDelete">Eliminar</button></td>';
        html += "</tr>";
    });

    document.querySelector('#tableData tbody').innerHTML = html;
}

// Cargar datos al cargar la página
window.onload = function () {
    showData();
    clearFields();
};

// Para eliminar data
function deleteData(index) {
    let listPeople = JSON.parse(localStorage.getItem('listPeople')) || [];

    listPeople.splice(index, 1);
    localStorage.setItem('listPeople', JSON.stringify(listPeople));
    showData();
}

// Para actualizar data
function updateData(index) {
    // Cambiar la visibilidad de los botones
    document.getElementById('btnAdd').style.display = 'none';
    document.getElementById('btnUpdate').style.display = 'block';

    let listPeople = JSON.parse(localStorage.getItem('listPeople')) || [];

    // Rellenar el formulario con el dato
    document.getElementById('inputName').value = listPeople[index].name;
    document.getElementById('inputEmail').value = listPeople[index].email;
    document.getElementById('inputPhone').value = listPeople[index].phone;

    // Obtener el botón de actualizar
    let btnUpdate = document.getElementById('btnUpdate');

    // Verificar si ya hay un manejador de eventos click
    if (!btnUpdate.hasEventListener) {
        // Actualizar
        btnUpdate.addEventListener('click', function () {
            // Actualizar dato
            listPeople[index].name = document.getElementById('inputName').value;
            listPeople[index].email = document.getElementById('inputEmail').value;
            listPeople[index].phone = document.getElementById('inputPhone').value;

            // Guardar
            localStorage.setItem('listPeople', JSON.stringify(listPeople));

            // Actualizar la tabla
            showData();

            // Limpiar los campos
            clearFields();

            // Cambiar la visualización de los botones
            document.getElementById('btnAdd').style.display = 'block';
            document.getElementById('btnUpdate').style.display = 'none';
        });

        // Marcar que ya hay un manejador de eventos click
        btnUpdate.hasEventListener = true;
    }
}

// Asignar el evento click fuera de la función updateData
document.getElementById('btnUpdate').addEventListener('click', updateData);


// Limpiar datos
function clearFields() {
    document.getElementById('inputName').value = "";
    document.getElementById('inputEmail').value = "";
    document.getElementById('inputPhone').value = "";
}

function getFormValues() {
    return {
        name: document.getElementById('inputName').value,
        email: document.getElementById('inputEmail').value,
        phone: document.getElementById('inputPhone').value
    };
}

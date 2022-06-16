const card = document.getElementById("cardDinamica");
for (let array of productoA) {
    const productoL = document.createElement("div");
    productoL.innerHTML += `
        <div class="card mb-3 item" style="width: 18rem;">
          <div class="container card-body">
            <img class="imgArray card-img-top" src="${array.img}" >
            <h3 class="item-title"> ${array.nombre} </h3>
            <p class="card-text"><strong>$${array.precio}</strong></p>
            <button id="btn${array.id}" class="btn btn-warning rounded-pill text-secondary">Agregar al carrito</button>
            </div>
         </div>`
    card.appendChild(productoL);
}

//Interactuando con el html
let textoBotonUno = document.getElementById("botonUno");
console.log(textoBotonUno.innerHTML);
textoBotonUno.innerHTML = "Inicio";

let textoBotonDos = document.getElementById("botonDos");
console.log(textoBotonDos.innerHTML);
textoBotonDos.innerHTML = "Tienda";

let titulo = document.getElementById("titulo");
titulo.style.font = "bold  50px Source Serif";

let fondoFooter = document.getElementById("newsletter");
fondoFooter.style.background = "black";
fondoFooter.style.color = "white";
console.log(fondoFooter.innerHTML);



//Eventos sobre el Formulario Newsletter

let form = document.getElementById("formulario");
form.addEventListener("click", (e) => botonEnviar(e));
const botonEnviar = (e) => {
    e.preventDefault();
    let email = e.target.parentNode.children[1].value;
    console.log(email);
    createNewSuscriptor({
        email
    });
    console.log(listasuscriptores);

};

class Suscriptor {
    constructor(email, id) {
        this.email = email;
        this.id = id;
    }
};

const createNewSuscriptor = (email) => {
    const id = listasuscriptores.generateId();
    const newSubs = new Suscriptor(email, id);
    listasuscriptores.addSuscriptor(newSubs);
};
class Suscriptores {
    constructor() {
        this.listasuscriptores = [];
    }
    addSuscriptor(suscriptort) {
        this.listasuscriptores.push(suscriptort);
    }
    generateId() {
        return Date.now();
    }
};

const listasuscriptores = new Suscriptores();


//Tecla enter
function capturarP(e) {
    if ((e.which == 13) || (e.keycode == 13)) {
        alert("Escriba un email y luego presione el boton enviar")
    }
};

//Eventos de carrito
let carritoDeCompras = [];
if (localStorage.getItem("carrito") != null) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

productoA.forEach(array => {
    document.getElementById(`btn${array.id}`).addEventListener('click', function() {
        agregarAlCarrito(array);
    });
})

function agregarAlCarrito(productoNuevo) {
    carritoDeCompras.push(productoNuevo);
    console.log(carritoDeCompras);
    alert("Producto: " + productoNuevo.nombre + " agregado al carrito.");
    document.getElementById("cuerpoTabla").innerHTML += `
    <tr>
    <td>${productoNuevo.id}</td>
    <td>${productoNuevo.nombre}</td>
    <td>${productoNuevo.precio}</td>
    </tr>
    `;
    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
}

//Modo cuervo
let modo = localStorage.getItem("modo");
if (modo == null) {
    modo = "dark"
};
let menu = document.getElementById("menu");
let boton = document.getElementById("mode");
document.body.className = modo;
menu.className = "navbar navbar-expand-lg " + modo;
localStorage.setItem("modo", modo);

boton.onclick = () => {
    if (modo == "dark") {
        document.body.className = "blue";
        menu.className = "navbar navbar-expand-lg blue";
        modo = "blue";
        boton.innerText = "Modo Cuervo";
    } else {
        document.body.className = "dark";
        menu.className = "navbar navbar-expand-lg dark";
        modo = "dark";
        boton.innerText = "Modo Oscuro";
    }
    localStorage.setItem("modo", modo);
}
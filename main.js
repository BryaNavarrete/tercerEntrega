class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1; 
    }
}

const mortalKombat = new Producto(1, "Mortal Kombat 1", 96000, "img/mk1.jpg");
const streetFighter = new Producto(2, "Street Fighter 6", 73000, "img/st6.jpg");
const tekken = new Producto(3, "Tekken", 111000, "img/tekken8.jpg");
const kof = new Producto(4, "KOF XV", 65000, "img/kofxv.jpg");
const pokemonPurpura = new Producto(5, "Pokemon Purpura", 79000, "img/pokemonPurpura.webp");
const pokemonEscarlata = new Producto(6, "Pokemon Escarlata", 82000, "img/pokemonEscarlata.png");
const marioKart = new Producto(7, "Mario Kart 8", 83000, "img/marioKart8.jpg");
const marioVsDk = new Producto(8, "Mario VS Donkey Kong", 70000, "img/marioVsDk.jpg");

const productos = [mortalKombat, streetFighter, tekken, kof, pokemonPurpura, pokemonEscarlata, marioKart, marioVsDk];

let carrito = []; 

if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
} 

const contenedorProductos = document.getElementById("contenedorProductos");

const mostrarProductos = () => {
    productos.forEach (producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `<div class="card">
                          <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                          <div class= "card-body">
                          <h5>${producto.nombre}</h5>
                          <p> ${producto.precio} </p>
                        <button class="btn colorBoton" id="boton${producto.id}" > Agregar a tu carrito </button>
                       </div>
                  </div>`
        contenedorProductos.appendChild(card);

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        })
    })
}

mostrarProductos();

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotal();
}


const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito")

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})


const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";

    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                <div class="card">
                    <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                    <div class= "card-body">
                        <h5>${producto.nombre}</h5>
                        <p> ${producto.precio} </p>
                        <p> ${producto.cantidad} </p>
                        <button class="btn colorBoton" id="eliminar${producto.id}" > Eliminar Producto </button>
                    </div>
                </div>
                        `
        contenedorCarrito.appendChild(card);


        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })

    })
    calcularTotal();
}


const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

  
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})



const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

 
    localStorage.clear();
}



const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `Total: $${totalCompra}`;
}
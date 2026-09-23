// 1) Referencias al DOM con querySelector
const contenedor = document.querySelector("#productos");
const estado = document.querySelector("#estado");

const formatoPrecio = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0
});

// 2) Función asíncrona que pide el JSON con fetch
async function cargarProductos() {
  try {
    const respuesta = await fetch("productos.json");

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al leer productos.json`);
    }

    const datos = await respuesta.json();
    mostrarProductos(datos.productos);
    estado.textContent = "";
  } catch (error) {
    console.error(error);
    estado.textContent =
      "No pudimos cargar los productos. Abrí la página con un servidor local (por ejemplo, Live Server).";
    estado.classList.add("error");
  }
}

// 3) Crea una tarjeta por cada producto
function mostrarProductos(productos) {
  contenedor.innerHTML = "";

  productos.forEach((producto) => {
    const agotado = producto.stock === 0;

    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    tarjeta.innerHTML = `
      <div class="tarjeta__imagen" aria-hidden="true">${producto.emoji}</div>
      <div class="tarjeta__cuerpo">
        <span class="tarjeta__categoria">${producto.categoria}</span>
        <h2 class="tarjeta__titulo">${producto.nombre}</h2>
        <p class="tarjeta__descripcion">${producto.descripcion}</p>
        <div class="tarjeta__pie">
          <span class="tarjeta__precio">${formatoPrecio.format(producto.precio)}</span>
          <span class="tarjeta__stock ${agotado ? "tarjeta__stock--agotado" : ""}">
            ${agotado ? "Sin stock" : `${producto.stock} disponibles`}
          </span>
        </div>
      </div>
    `;
    contenedor.appendChild(tarjeta);
  });
}

// 4) La carga arranca con el evento load
window.addEventListener("load", cargarProductos);

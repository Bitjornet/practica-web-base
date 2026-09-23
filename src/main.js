import './style.css'
import { productos } from './datos.js'

// Elemento donde se dibujan las tarjetas (lo creas en el Ejercicio 1)
const catalogo = document.getElementById('catalogo')

// ------------------------------------------------------------
// EJERCICIO 2 — mostrarProductos(lista)
// ------------------------------------------------------------
function mostrarProductos(lista) {
  const catalogoHTML = lista.map(p => `
    <div class="bg-white rounded-lg shadow p-4 flex flex-col justify-between">
      <div>
        <h2 class="text-xl font-semibold text-gray-800">${p.nombre}</h2>
        <p class="text-gray-600 mt-2">$${p.precio}</p>
      </div>
      <button data-id="${p.id}" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Agregar
      </button>
    </div>
  `).join('');

  // Insertamos las tarjetas generadas en el contenedor
  catalogo.innerHTML = catalogoHTML;
}

mostrarProductos(productos);

// ------------------------------------------------------------
// EJERCICIO 3 — Armar el pedido
// El pedido es un arreglo con los productos que la persona va agregando.
// ------------------------------------------------------------
const pedido = []

// Escribe aquí tu código del Ejercicio 3

// ------------------------------------------------------------
// EJERCICIO 4 — Filtrar por categoría
// ------------------------------------------------------------

// Escribe aquí tu código del Ejercicio 4
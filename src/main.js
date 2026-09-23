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
// ------------------------------------------------------------
let pedido = []; // Cambiamos const por let para poder vaciarlo fácilmente

// Elementos del HTML que necesitamos
const listaPedidoHTML = document.getElementById('lista-pedido');
const totalHTML = document.getElementById('total');
const btnVaciar = document.getElementById('btn-vaciar');

// 1. Escuchar los clics en el contenedor del catálogo (Delegación de eventos)
catalogo.addEventListener('click', (evento) => {
  // Buscamos si el clic fue en un botón "Agregar"
  const boton = evento.target.closest('button[data-id]');
  
  if (!boton) return; // Si no hizo clic en un botón, no hacemos nada

  // Obtenemos el ID del producto desde el botón
  const id = Number(boton.dataset.id);
  
  // Buscamos el producto completo en nuestro arreglo de 'productos'
  const productoSeleccionado = productos.find(p => p.id === id);
  
  // Lo agregamos al arreglo del pedido
  pedido.push(productoSeleccionado);
  
  // Redibujamos la vista del pedido
  mostrarPedido();
});

// 2. Función para dibujar los productos seleccionados y calcular el total
function mostrarPedido() {
  // Si el pedido está vacío, mostramos un mensaje
  if (pedido.length === 0) {
    listaPedidoHTML.innerHTML = '<li class="text-gray-400 text-sm">No hay productos aún.</li>';
    totalHTML.textContent = '0.00';
    return;
  }

  // Dibujamos cada producto con map()
  listaPedidoHTML.innerHTML = pedido.map(p => `
    <li class="flex justify-between items-center text-sm">
      <span>${p.nombre}</span>
      <span class="font-semibold">$${p.precio}</span>
    </li>
  `).join('');

  // Calculamos el total usando reduce()
  // Nota: Convertimos el precio a Number() porque en tus datos.js está como texto ("150.00")
  const total = pedido.reduce((suma, p) => suma + Number(p.precio), 0);
  
  // Mostramos el total en pantalla
  totalHTML.textContent = total.toFixed(2);
}

// 3. Botón para vaciar el pedido
btnVaciar.addEventListener('click', () => {
  pedido = []; // Vaciamos el arreglo
  mostrarPedido(); // Redibujamos para que vuelva a cero
});

// ------------------------------------------------------------
// EJERCICIO 4 — Filtrar por categoría
// ------------------------------------------------------------
const botonesFiltro = document.querySelectorAll('.btn-filtro');

botonesFiltro.forEach(boton => {
  boton.addEventListener('click', (evento) => {
    // Obtenemos la categoría del botón que fue clickeado
    const categoriaSeleccionada = evento.target.dataset.categoria;

    // 1. Llamar a mostrarProductos con la lista filtrada
    if (categoriaSeleccionada === 'Todos') {
      mostrarProductos(productos); // Todos muestra la lista completa[cite: 9]
    } else {
      const filtrados = productos.filter(p => p.categoria === categoriaSeleccionada);
      mostrarProductos(filtrados);
    }

    // 2. Resaltar el botón activo con clases de Tailwind[cite: 9]
    // Primero, regresamos todos los botones a su estado inactivo (fondo blanco)
    botonesFiltro.forEach(btn => {
      btn.classList.remove('bg-blue-600', 'text-white');
      btn.classList.add('bg-white', 'text-blue-600', 'border', 'border-blue-600');
    });

    // Luego, le ponemos el estado activo (fondo azul) solo al botón clickeado
    evento.target.classList.remove('bg-white', 'text-blue-600', 'border', 'border-blue-600');
    evento.target.classList.add('bg-blue-600', 'text-white');
  });
});
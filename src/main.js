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

// ------------------------------------------------------------
// EJERCICIO 5 — Datos del cliente con validación
// ------------------------------------------------------------
const formCliente = document.getElementById('form-cliente');
const inputNombre = document.getElementById('nombre');
const inputTelefono = document.getElementById('telefono');
const inputCorreo = document.getElementById('correo');

const errorNombre = document.getElementById('error-nombre');
const errorTelefono = document.getElementById('error-telefono');
const errorCorreo = document.getElementById('error-correo');
const errorPedido = document.getElementById('error-pedido');

formCliente.addEventListener('submit', (evento) => {
  // Evita que la página se recargue al darle al botón
  evento.preventDefault(); 

  let esValido = true;

  // 1. Validar nombre: no vacío ni solo espacios
  if (inputNombre.value.trim() === '') {
    errorNombre.classList.remove('hidden');
    inputNombre.classList.add('border-red-600');
    esValido = false;
  } else {
    errorNombre.classList.add('hidden');
    inputNombre.classList.remove('border-red-600');
  }

  // 2. Validar teléfono: exactamente 10 dígitos
  if (!/^\d{10}$/.test(inputTelefono.value)) {
    errorTelefono.classList.remove('hidden');
    inputTelefono.classList.add('border-red-600');
    esValido = false;
  } else {
    errorTelefono.classList.add('hidden');
    inputTelefono.classList.remove('border-red-600');
  }

  // 3. Validar correo: formato algo@algo.algo
  if (!/^\S+@\S+\.\S+$/.test(inputCorreo.value)) {
    errorCorreo.classList.remove('hidden');
    inputCorreo.classList.add('border-red-600');
    esValido = false;
  } else {
    errorCorreo.classList.add('hidden');
    inputCorreo.classList.remove('border-red-600');
  }

  // 4. Validar pedido: no debe estar vacío
  if (pedido.length === 0) {
    errorPedido.classList.remove('hidden');
    esValido = false;
  } else {
    errorPedido.classList.add('hidden');
  }

  // Reemplazo del bloque final del Ejercicio 5:
  if (esValido) {
    pedidosRegistrados.push({
      id: Date.now(),
      cliente: {
        nombre: inputNombre.value,
        telefono: inputTelefono.value,
        correo: inputCorreo.value
      },
      productos: [...pedido], // Guardamos una copia exacta del arreglo
      total: pedido.reduce((suma, p) => suma + Number(p.precio), 0),
      estado: 'Pendiente'
    });
    
    pedido = []; // Vaciamos el carrito
    formCliente.reset(); // Limpiamos el formulario
    mostrarPedido(); // Redibujamos la barra lateral (ahora vacía)
    mostrarPedidosRegistrados(); // Dibujamos el nuevo pedido en la sección inferior
  }
}); // <--- AQUÍ SE CIERRA CORRECTAMENTE EL EJERCICIO 5

// ------------------------------------------------------------
// EJERCICIO 6 Y 7 — Pedidos registrados y Cancelación (Extra)
// ------------------------------------------------------------
const pedidosRegistrados = [];
const ESTADOS = ['Pendiente', 'En preparación', 'Entregado'];
// Agregamos el color para el nuevo estado Cancelado
const COLORES = { 
  'Pendiente': 'bg-yellow-100 border-yellow-400', 
  'En preparación': 'bg-blue-100 border-blue-400', 
  'Entregado': 'bg-green-100 border-green-400',
  'Cancelado': 'bg-red-100 border-red-400 text-gray-500 opacity-75' 
};

const contenedorPedidosRegistrados = document.getElementById('pedidos-registrados');

function mostrarPedidosRegistrados() {
  contenedorPedidosRegistrados.innerHTML = pedidosRegistrados.map(p => `
    <div class="border-2 rounded-lg p-4 shadow-sm flex flex-col justify-between ${COLORES[p.estado]}">
      <div>
        <h3 class="font-bold text-lg text-gray-900 mb-1">${p.cliente.nombre}</h3>
        <p class="text-sm text-gray-700">Estado: <span class="font-semibold uppercase">${p.estado}</span></p>
        <p class="text-sm text-gray-700 mt-2 line-clamp-2">Productos: ${p.productos.map(prod => prod.nombre).join(', ')}</p>
        <p class="font-bold text-gray-900 mt-2">Total: $${p.total.toFixed(2)}</p>
      </div>
      
      <div class="flex gap-2 mt-4">
        <!-- El botón Avanzar solo aparece si no está Entregado ni Cancelado -->
        ${p.estado !== 'Entregado' && p.estado !== 'Cancelado' ? `
          <button data-avanzar="${p.id}" class="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition font-medium text-sm">
            Avanzar estado
          </button>
        ` : ''}
        
        <!-- El botón Cancelar SOLO aparece si el pedido apenas está Pendiente -->
        ${p.estado === 'Pendiente' ? `
          <button data-cancelar="${p.id}" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition font-medium text-sm">
            Cancelar
          </button>
        ` : ''}
      </div>
    </div>
  `).join('');
}

// Delegación de eventos para AMBOS botones
contenedorPedidosRegistrados.addEventListener('click', (evento) => {
  // 1. Lógica para el botón "Avanzar"
  const btnAvanzar = evento.target.closest('button[data-avanzar]');
  if (btnAvanzar) {
    const idPedido = Number(btnAvanzar.dataset.avanzar);
    const pedidoActual = pedidosRegistrados.find(p => p.id === idPedido);
    const indiceActual = ESTADOS.indexOf(pedidoActual.estado);
    
    if (indiceActual < ESTADOS.length - 1) {
      pedidoActual.estado = ESTADOS[indiceActual + 1];
      mostrarPedidosRegistrados();
    }
    return; // Terminamos aquí para que no siga leyendo
  }

  // 2. Lógica para el botón "Cancelar"
  const btnCancelar = evento.target.closest('button[data-cancelar]');
  if (btnCancelar) {
    const idPedido = Number(btnCancelar.dataset.cancelar);
    const pedidoActual = pedidosRegistrados.find(p => p.id === idPedido);
    
    // Le asignamos el estado Cancelado directamente
    pedidoActual.estado = 'Cancelado';
    mostrarPedidosRegistrados();
  }
});
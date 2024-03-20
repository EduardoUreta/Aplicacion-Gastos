'use strict';

const boton = document.getElementById('toggle-form-gasto');
const formularioGasto = document.getElementById('formulario-gasto');

const abrirFormularioGasto = (modo = 'agregarGasto') => {
    boton.classList.add('agregar-gasto__btn--active');
    formularioGasto.classList.add('formulario-gasto--active');

    if(modo === 'editarGasto'){
        document.querySelector('.formulario-gasto__titulo').innerText = 'Editar Gasto';
        document.querySelector('.formulario-gasto__btn').innerText = 'Editar Gasto';
        document.getElementById('formulario-gasto').dataset.modo = 'editarGasto';
    } else {
        document.getElementById('descripcion').value = '';
        document.getElementById('precio').value = '';
    
        document.querySelector('.formulario-gasto__titulo').innerText = 'Agregar Gasto';
        document.querySelector('.formulario-gasto__btn').innerText = 'Agregar Gasto';
        document.getElementById('formulario-gasto').dataset.modo = 'agregarGasto';
    }
};

const cerrarFormularioGasto = () => {
    boton.classList.remove('agregar-gasto__btn--active');
    formularioGasto.classList.remove('formulario-gasto--active');
};

boton.addEventListener('click', (e) => {
    if([...formularioGasto.classList].includes('formulario-gasto--active')){
        cerrarFormularioGasto();
    } else {
        abrirFormularioGasto();
    }
});

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var native = {
  randomUUID
};

function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return unsafeStringify(rnds);
}

const contenedorGastos$1 = document.querySelector('#gastos .gastos__lista');

const cargarGatos = () => {

    const gastos = JSON.parse(window.localStorage.getItem('gastos')); //Transformo a objeto JS
    
    if(gastos && gastos.length > 0){

        // Borrar mensaje de sins gastos
        document.querySelector('#gastos .gastos__mensaje').classList.remove('gastos__mensaje--active');

        // Que no hayan gastos en pantalla
        contenedorGastos$1.innerHTML = '';

        gastos.forEach(item => {
            contenedorGastos$1.innerHTML += `
                <div class="gasto" data-id="${item.id}">
                    <div class="gasto__info">
                        <div>
                            <p class="gasto__nombre">${item.descripcion}</p>
                            <p class="gasto__cantidad">$${item.precio}</p>
                        </div>
                        <p class="gasto__fecha">${item.fecha}</p>
                    </div>
                    <div class="gasto__acciones">
                        <button class="gasto__btn" data-accion="editar-gasto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-pencil-square"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                />
                                <path
                                    fill-rule="evenodd"
                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                />
                            </svg>
                            <span>Editar</span>
                        </button>
                        <button class="gasto__btn gasto__btn--rojo" data-accion="eliminar-gasto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-trash3-fill"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"
                                />
                            </svg>
                            <span>Eliminar</span>
                        </button>
                    </div>
                </div>
            `;
        });


    } else {
        // Que no hayan gastos en pantalla
        contenedorGastos$1.innerHTML = '';
        // Mensaje sin gastos
        document.querySelector('#gastos .gastos__mensaje').classList.add('gastos__mensaje--active');
    }

};

const cargarTotal = () => {
    const gastos = JSON.parse(window.localStorage.getItem('gastos'));
    let total = 0;

    const contenedorTotal = document.getElementById('total-gastado');
    
    if(gastos){
        gastos.forEach((item) => {
            total += parseFloat(item.precio);
        });
    }

    contenedorTotal.innerText = `$${total}`;
};

const formulario = document.querySelector('#formulario-gasto form');
const descripcion = formulario.descripcion;
const precio = formulario.precio;

const expRegDescripcion = /^[a-zA-Z0-9\_\-]{4,30}$/;
const expRegPrecio = /^\$?(\d{1,3})(,\d{3})*(\.\d{1,2})?$/;

const comprobarDescripcion = () => {
    if(!expRegDescripcion.test(descripcion.value)){
        descripcion.classList.add('formulario-gasto__input--error');

        descripcion.parentElement.querySelector('.formulario-gasto__leyenda').classList.add('formulario-gasto__leyenda--active');

        return false;
    } else {
        descripcion.classList.remove('formulario-gasto__input--error');

        descripcion.parentElement.querySelector('.formulario-gasto__leyenda').classList.remove('formulario-gasto__leyenda--active');

        return true;
    }
};

descripcion.addEventListener('blur', () => {
    comprobarDescripcion();
});

// Event Listener para cuando el input tiene un error y el usuario empieza a escribir para corregirlo
descripcion.addEventListener('keyup', (e) => {
    if([...e.target.classList].includes('formulario-gasto__input--error')){
        comprobarDescripcion();
    }
});

const comprobarPrecio = () => {
    if(!expRegPrecio.test(precio.value)){
        precio.classList.add('formulario-gasto__input--error');

        precio.parentElement.querySelector('.formulario-gasto__leyenda').classList.add('formulario-gasto__leyenda--active');

        return false;
    } else {
        precio.classList.remove('formulario-gasto__input--error');

        precio.parentElement.querySelector('.formulario-gasto__leyenda').classList.remove('formulario-gasto__leyenda--active');

        return true;
    }
};

precio.addEventListener('blur', () => {
    comprobarPrecio();
});

// Event Listener para cuando el input tiene un error y el usuario empieza a escribir para corregirlo
precio.addEventListener('keyup', (e) => {
    if([...e.target.classList].includes('formulario-gasto__input--error')){
        comprobarPrecio();
    }
});


formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener el modo, editar o agregar
    const modo = formulario.closest('.formulario-gasto')?.dataset?.modo;

    if(comprobarDescripcion() && comprobarPrecio()){

        const nuevoGasto = {
            id: v4(),
            fecha: new Date().toLocaleDateString(),
            descripcion: descripcion.value,
            precio: precio.value
        };

        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos')); //De JSON a objeto JS

        if(modo === 'agregarGasto'){
            if(gastosGuardados){
                const listaGastos = [...gastosGuardados, nuevoGasto];
                // Cargar al localStorage
                window.localStorage.setItem('gastos', JSON.stringify(listaGastos)); //De objeto JS a JSON
            } else {
                window.localStorage.setItem('gastos', JSON.stringify([{...nuevoGasto}]));
            }
        } else if (modo === 'editarGasto'){
            // Id del gasto a editar
            const id = document.getElementById('formulario-gasto').dataset?.id;

            // Obtener el index
            let indexGastoEditar;
            if(id && gastosGuardados){
                gastosGuardados.forEach((item, index) => {
                    if(item.id === id){
                        indexGastoEditar = index;
                    }
                });
            }
            // Hacer una copia de los datos guardados para poder editar
            const nuevosGastos = [...gastosGuardados];

            // Nuevo arreglo con los datos nuevos
            nuevosGastos[indexGastoEditar] = {
                ...gastosGuardados[indexGastoEditar],
                descripcion: descripcion.value,
                precio: precio.value
            };

            // Guardar el LocalStorage
            window.localStorage.setItem('gastos', JSON.stringify(nuevosGastos)); // de Json a texto
        }

        cargarGatos();
        cerrarFormularioGasto();
        cargarTotal();

        descripcion.value = '';
        precio.value = '';

    }
});

const contenedorGastos = document.getElementById('gastos');

contenedorGastos.addEventListener('click', (e) => {
    const gasto = e.target.closest('.gasto');
    
    if(gasto){
        if(gasto.scrollLeft > 0){
            //Mostrar la info
            gasto.querySelector('.gasto__info').scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest'
            });
        } else {
            // Acceder a botones
            gasto.querySelector('.gasto__acciones').scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest'
            });
        }
    }
    // Editar Gasto
    if(e.target.closest('[data-accion="editar-gasto"]')){
        // Obtener id del gasto
        const id = gasto.dataset.id;
        // Obtener los datos guardados
        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos'));

        let precio = '';
        let descripcion = '';

        // Obtener los datos del gasto a editar
        if(gastosGuardados && gastosGuardados.length > 0){
            gastosGuardados.forEach(item => {
                if(item.id === id){
                    precio = item.precio,
                    descripcion = item.descripcion;
                }
            });
        }

        // Poner los datos del gasto en el formulario para editar
        document.querySelector('#formulario-gasto #descripcion').value = descripcion;
        document.querySelector('#formulario-gasto #precio').value = precio;
        document.querySelector('#formulario-gasto').dataset.id = id;

        abrirFormularioGasto('editarGasto');
    }
    // Eliminar Gasto
    if(e.target.closest('[data-accion="eliminar-gasto"]')){
        // Obtener id del gasto
        const id = gasto.dataset.id;
        
        // Obtener gastos guardados
        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos'));
        
        // Eliminar con un filter
        if(gastosGuardados){
            const nuevosGastos = gastosGuardados.filter((item) => {
                if(item.id !== id){
                    return item;
                }
            });
            // Actualizar localStorage
            window.localStorage.setItem('gastos', JSON.stringify(nuevosGastos));
        }

        cargarGatos();
        cargarTotal();
    }

});

cargarGatos();
cargarTotal();
//# sourceMappingURL=bundle.js.map

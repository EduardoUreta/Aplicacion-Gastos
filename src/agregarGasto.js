import { v4 as uuidv4 } from 'uuid'
import { cerrarFormularioGasto } from './eventoBtnFormGasto';
import { cargarGatos } from './cargarGastos';
import { cargarTotal } from './cargarTotal';

const formulario = document.querySelector('#formulario-gasto form');
const descripcion = formulario.descripcion;
const precio = formulario.precio;

const expRegDescripcion = /^[a-zA-Z0-9\_\-]{4,30}$/;
const expRegPrecio = /^\$?(\d{1,3})(,\d{3})*(\.\d{1,2})?$/;

export const comprobarDescripcion = () => {
    if(!expRegDescripcion.test(descripcion.value)){
        descripcion.classList.add('formulario-gasto__input--error');

        descripcion.parentElement.querySelector('.formulario-gasto__leyenda').classList.add('formulario-gasto__leyenda--active');

        return false;
    } else {
        descripcion.classList.remove('formulario-gasto__input--error');

        descripcion.parentElement.querySelector('.formulario-gasto__leyenda').classList.remove('formulario-gasto__leyenda--active');

        return true;
    }
}

descripcion.addEventListener('blur', () => {
    comprobarDescripcion();
});

// Event Listener para cuando el input tiene un error y el usuario empieza a escribir para corregirlo
descripcion.addEventListener('keyup', (e) => {
    if([...e.target.classList].includes('formulario-gasto__input--error')){
        comprobarDescripcion();
    }
});

export const comprobarPrecio = () => {
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
            id: uuidv4(),
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
                window.localStorage.setItem('gastos', JSON.stringify([{...nuevoGasto}]))
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
import { cargarGatos } from "./cargarGastos";
import { cargarTotal } from "./cargarTotal";
import { abrirFormularioGasto } from "./eventoBtnFormGasto";

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
            })
        } else {
            // Acceder a botones
            gasto.querySelector('.gasto__acciones').scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest'
            })
        }
    };

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
                    descripcion = item.descripcion
                }
            });
        }

        // Poner los datos del gasto en el formulario para editar
        document.querySelector('#formulario-gasto #descripcion').value = descripcion;
        document.querySelector('#formulario-gasto #precio').value = precio;
        document.querySelector('#formulario-gasto').dataset.id = id;

        abrirFormularioGasto('editarGasto');
    };

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
            })
            // Actualizar localStorage
            window.localStorage.setItem('gastos', JSON.stringify(nuevosGastos))
        }

        cargarGatos();
        cargarTotal();
    }

});
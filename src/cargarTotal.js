export const cargarTotal = () => {
    const gastos = JSON.parse(window.localStorage.getItem('gastos'));
    let total = 0;

    const contenedorTotal = document.getElementById('total-gastado')
    
    if(gastos){
        gastos.forEach((item) => {
            total += parseFloat(item.precio);
        });
    }

    contenedorTotal.innerText = `$${total}`;
};
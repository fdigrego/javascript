//queda pendiente -> vender x cantidad y al eliminar solo dejar marca

let tarea ='buscar';
let enMenu = true;
let pepe;
class unProducto {
    constructor(nombre, precio, stock){
        this.nombre = String(nombre).toLowerCase();
        this.precio = Number(precio);
        this.stock = Number(stock);
        this.vendido = false;
        this.ventas = 0;
    }
    vender(){
        this.vendido = true;
        this.stock--;
        this.ventas++;
        let valorIva = this.precio * 0.21;
    }
}
const losProductos = [];
function replacer(key, value) {
    if (typeof value === 'function') {
        return value.toString();
    }
    return value;
}
function reviver(key, value) {
    if (typeof value === 'string') {
        const regex = /^function\s*([\w$]+)?\s*\(([\w\s,]*)\)\s*\{([\w\W]*?)\}$/;
        const parts = regex.exec(value);
        if (parts) {
            return new Function(parts[2], parts[3]);
        }
    }
    return value;
}

if (localStorage.getItem('myObj') === null) {
    console.log('detecto que no hay data en local storage');
    //Productos iniciales agregados con push y unshift
    let prod1 = new unProducto('virulana', 150, 43);
    let prod2 = new unProducto('ACEITE', 740, 21);
    let prod3 = new unProducto('ZANAHORIA', 30, 62);
    let prod4 = new unProducto('limón', 25, 88);
    let prod5 = new unProducto('vinagre', 432, 50);
    losProductos.push(prod1, prod3, prod5, prod4);
    losProductos.unshift(prod2);    
} else {
    //localStorage tiene datos y los traigo
    const serializedObjFromLocalStorage = localStorage.getItem('myObj');
    const objFromLocalStorage = JSON.parse(serializedObjFromLocalStorage, reviver());
    //guardo cada item del array
    objFromLocalStorage.forEach(item => {
        const producto = new unProducto(item.nombre, item.precio, item.stock);
        producto.vendido = item.vendido;
        producto.ventas = item.ventas;
        losProductos.push(producto);
    });    
}
//muestro array inicial por pantalla
let mostrarProductos = document.getElementById("mostrarProductos")
    for (const info of losProductos) {
        //los 3 pasos para crear una una etiqueta del DOM en JS
        //paso 1 crear el elemento
        let li = document.createElement("li")
        //paso 2 imprimir a partir del innerHTML
        li.innerHTML = `Producto: ${info.nombre} precio: ${info.precio} stock: ${info.stock} vendido: ${info.vendido} ventas: ${info.ventas}.`
        //paso 3 decirle al document / body que creamos un elemento nuevo
        mostrarProductos.appendChild(li)    
}








function ubicarProducto(tarea){
    let buscar = prompt(`Buscar producto acción: ${tarea}`).toLowerCase();
    elemento = losProductos.findIndex((campo)=> campo.nombre === buscar);
    console.log(losProductos[elemento]);
}
function venderProducto(){
    ubicarProducto('vender');
    losProductos[elemento].vender();
    console.table(losProductos[elemento].nombre, losProductos[elemento].ventas);
}
function eliminarProducto(){
    ubicarProducto('eliminar');
    losProductos.splice(elemento,1);
}
function agregarProducto(){
    let nombre = prompt('Producto: ');
    let precio = prompt('Precio: ');
    let stock = prompt('Stock: ');
    let nuevoProducto = new unProducto(nombre, precio, stock);
    losProductos.push(nuevoProducto);
}
function guardarProductos() {
    const serializedObj = JSON.stringify(losProductos, replacer());
    localStorage.setItem('myObj', serializedObj);
}
function contarMovimientos(){
    cantVentas = losProductos.reduce((acum, valActual) =>  acum + valActual.ventas, 0);
    return console.log(`Total movimientos: ${cantVentas}`);
}
function acumuladoVentas(){
    cantVentas = losProductos.reduce((acum, valActual) =>  acum + valActual.ventas, 0);
    sumaVentas = losProductos.reduce((acum, valActual) =>  acum + (valActual.ventas * valActual.precio), 0);
    return console.log(`Total movimientos: ${cantVentas} por $${sumaVentas}`);
}
function valorDelStock(){
    unidadesEnStock = losProductos.reduce((acum, valActual) =>  acum + valActual.stock, 0);
    cantVentas = losProductos.reduce((acum, valActual) =>  acum + valActual.ventas, 0);
    sumaVentas = losProductos.reduce((acum, valActual) =>  acum + (valActual.ventas * valActual.precio), 0);
    valorDeExistencias = losProductos.reduce((acum, valActual) => acum + (valActual.precio * valActual.stock), 0);
    console.log(`#ventas ${cantVentas} $ventas ${sumaVentas} #Stock: ${unidadesEnStock} ValorStock ${valorDeExistencias}`);
}
function verProductosVendidos(){
    productosVendidos = losProductos.filter(producto => producto.vendido);
    totalVentas = productosVendidos.reduce((acum, valActual) =>  acum + (valActual.ventas * valActual.precio), 0);
    console.table(productosVendidos);
    console.log(`Total ventas: ${totalVentas}`);
}
do {
    enMenu = prompt('Opcion en Productos:\nl -> Listar\na -> Agregar\ne -> Elimininar\nv -> Vender\nm -> Movimientos\nv -> Vender\ns -> Stock\nn -> Ventas\ng -> Guardar Productos\nesc -> Salir').toLowerCase();
    switch (enMenu) {
        case 'l':
            console.table(losProductos);
            break;
        case 'a':
            agregarProducto();
            break;
        case 'e':
            eliminarProducto();
            break;
        case 'v':
            venderProducto();
            break;
        case 'm':
            contarMovimientos();
            break;
        case 't':
            acumuladoVentas();
            break;
        case 's':
            valorDelStock();
            break;
        case 'n':
            verProductosVendidos();
            break;
        case 'g':
            guardarProductos();
            break;
        default:
            break;
    }
} while (enMenu !== 'esc');
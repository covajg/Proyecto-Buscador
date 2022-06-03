// Ejercicio identificado como principios de las bases de una progframacion funcional...


// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//contenedor para los resultados
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear();
const min = max - 10

//Generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

//Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);  //Muestra los autos al cargar

    //Llena las opciones de años
    llenarSelect();
})

// eventListener para los select de busqueda
marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;

    filtrarAuto()
})

year.addEventListener('change', e =>{
    datosBusqueda.year = parseInt(e.target.value);  // lo cambiamos a entero, porque los datos siempre vienen en string...

    filtrarAuto()
})

minimo.addEventListener('change', e =>{
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();
})

maximo.addEventListener('change', e =>{
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
})

puertas.addEventListener('change', e =>{
    datosBusqueda.puertas = e.target.value;

    filtrarAuto();
})

transmision.addEventListener('change', e =>{
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
})

color.addEventListener('change', e =>{
    datosBusqueda.color = e.target.value;

    filtrarAuto();
})

// Funciones
function mostrarAutos(autos) {
    limpiarHTML();  //Elimina el HTML previo...

    autos.forEach(auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio: ${precio} - Color: ${color}        
        `;

        // insertar en el HTML
        resultado.appendChild(autoHTML);
    })
}

//Limpiar HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

// Genera los años del select
function llenarSelect(){
    for( let i = max; i >= min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); //esto agrega las opciones de año al select
    }
}

// funcion que filtra en base a la busqueda
function filtrarAuto(){  //Funcion de alto nivel... funciones que toman una funcion como parametro
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)

    if(resultado.length){
        mostrarAutos(resultado);
    }else{
        noResultado()
    }    
}

function noResultado(auto){
    limpiarHTML()

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No se encontro ningun resultado, intenta con otros parametros de busqueda'
    resultado.appendChild(noResultado)
}

function filtrarMarca(auto){
    const {marca} = datosBusqueda
    if(marca){
        return auto.marca === marca
    }else{
        return auto;
    }
}

function filtrarYear(auto){
    const {year} = datosBusqueda
    if(year){
        return auto.year === year
    }else{
        return auto;
    }
}

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda
    if(minimo){
        return auto.precio >= minimo
    }else{
        return auto;
    }
}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda
    if(maximo){
        return auto.precio <= maximo
    }else{
        return auto;
    }
}

function filtrarPuertas(auto){
    const {puertas} = datosBusqueda
    if(puertas){
        return auto.puertas == puertas
    }else{
        return auto;
    }
}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda
    if(transmision){
        return auto.transmision === transmision
    }else{
        return auto;
    }
}

function filtrarColor(auto){
    const {color} = datosBusqueda
    if(color){
        return auto.color === color
    }else{
        return auto;
    }
}


// Variables

const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){
    // agregar curso click Agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);

    // elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];  // resetear el array
        limpiarHTML();
    })
}

// Functions

function eliminarCurso(e) {
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // eliminar del array articulosCarrito by data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML();
    }
}



function agregarCurso(e) {
    e.preventDefault();
    // console.log(e.target.classList);
    if(e.target.classList.contains('agregar-carrito')){
        // console.log('Click ok');
        const cursoSeleccionado = e.target.parentElement.parentElement;
        // console.log(cursoSeleccionado);
        leerDatosCurso(cursoSeleccionado);
    }
}

// function leer el contenido del HTML y extrae la info
function leerDatosCurso(curso){
    // console.log(curso);

    // Crar object con contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    // console.log(infoCurso);

    // Comprobar si el elemento ya existe en el carrito
    const exite = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if (exite){
        // actualiza la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // agrega al carrito
        // agrega elementos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    // console.log(articulosCarrito);
    carritoHTML();

}


// Muestra el carrito de compras en el HTML
function carritoHTML() {
    // limpiar el carrito
    limpiarHTML();

    articulosCarrito.forEach( curso => {
        // destructuring
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        // Agrega el HTML en el tbody
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los cursos del carrito
function limpiarHTML() {
    // contenedorCarrito.innerHTML = '';

    // mejor performance
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
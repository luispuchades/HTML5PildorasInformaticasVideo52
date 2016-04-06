/*global window */
/*global alert */
/*jslint browser: true, for:true */

/**JavaScript Document
 * Curso: HMTL5 - Pildoras Informáticas - API IndexedDB II
 * Origin: Capitulo52.html ==> Almacenando en DB
 */

// "use strict";


//1. Definición de Objetos y Variables
var botonGrabar;
var zonaDatos;
var db;



//1.1 Extracción de elementos desde HTML
botonGrabar = document.getElementById("grabar");
zonaDatos = document.getElementById("zona-datos");



//2. Definición de Funciones

//function eliminarTodo() {
//    'use strict';
//
//    if (confirm("¿Estás seguro?")) {
////        sessionStorage.clear();
//        localStorage.clear();
//        itemMostrar();
//    }
//}
//
//function eliminarItem(itemClavePosicion) {
//    'use strict';
//
//    if (confirm("Estás seguro?")) {
////        sessionStorage.removeItem(itemClavePosicion);
//        localStorage.removeItem(itemClavePosicion);
//        itemMostrar();
//    }
//}



//function itemMostrar() {
//    'use strict';
//
//    var itemValorMostrar;
//    var i;
//    var itemClavePosicion;
//
////    itemValorMostrar = sessionStorage.getItem(itemClave);
//
////    itemValorMostrar = sessionStorage[itemClave];
//
//    zonaDatos.innerHTML = "";
//
//// Introducimos un botón que borrará el contenido
//    zonaDatos.innerHTML = '<div><button onclick = "eliminarTodo()">Eliminar todo</button></div>';
//
//
////    for (i = 0; i < sessionStorage.length; i = i + 1) {
//    for (i = 0; i < localStorage.length; i = i + 1) {
//
////        itemClavePosicion = sessionStorage.key(i);
//        itemClavePosicion = localStorage.key(i);
////        itemValorMostrar = sessionStorage.getItem(itemClavePosicion);
//        itemValorMostrar = localStorage.getItem(itemClavePosicion);
//        zonaDatos.innerHTML += '<div>Clave: ' + itemClavePosicion + '--' + 'Valor: ' + itemValorMostrar + '<br />' + '<button onclick ="eliminarItem(\'' + itemClavePosicion + '\') ">Eliminar Item </button></div>';
//    }
//}


function agregarObjeto() {
    'use strict';

    var itemClave;
    var itemTexto;
    var itemFecha;
    var transaccion;
    var almacen;
    var agregar;

//OJO DEFINIMOS itemClave e itemValor como variables locales. Si las
// definimos como variables generales, no funciona
    itemClave = document.getElementById("clave").value;
    itemTexto = document.getElementById("texto").value;
    itemFecha = document.getElementById("fecha").value;

//    Definimos el tipo de transacción que vamos a realizarr
    transaccion = db.transaction(["gente"], "readwrite");

//    Almaceno el valor de la transacción en la variable almacen
    almacen = transaccion.objectStore("gente");

//    Almaceno en la variable agregar el valor de almacen
    agregar = almacen.add({clave: itemClave, titulo: itemTexto, fecha: itemFecha});



    document.getElementById("clave").value = "";
    document.getElementById("texto").value = "";
    document.getElementById("fecha").value = "";

}

//function abrirDB() {
//    'use strict';
//
//    var solicitud;
//
//    solicitud = indexedDB.open("miBase");
//    solicitud.onsuccess = function(e) {
//        db = e.target.result;
//    }
//    solicitud.onupgradeneeded = function(e) {
//        db = e.target.result;
//        db.createObjectStore("gente", {keypath: "clave"})
//    }
//}


function iniciar() {
    'use strict';

    botonGrabar.addEventListener("click", agregarObjeto, false);

    var solicitud;


    solicitud = indexedDB.open("miBase");

    solicitud.onupgradeneeded = function () {
        db = solicitud.result;
        db.createObjectStore("gente", {keyPath: "clave"});
    };

    solicitud.onsuccess = function () {
        db = solicitud.result;
    };

}


//3. Asignación de Eventos
document.addEventListener("DOMContentLoaded", iniciar, false);

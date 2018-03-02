# DIWEB-JQueryUI

Ejercicio práctico en el cual ponemos a prueba JqueryUI a través de una
interfaz propia.

Las distintas librerías y frameworks usados son:

* Bootstrap - Para el diseño responsive así como el tema base.
* Lumen Theme - [Bootswatch](https://bootswatch.com/lumen/) -
  Personalización de bootstrap
* FontAwesome 5 - Inclusión de distinta iconografía.

Además se han usado distintas funciones propias que se pueden revisar en
_js/custom.js_

## Tarea 1 - Distintos temas de JqueryUI
Dentro del mismo sitio web, gracias a un selector, podemos cambiar el
tema a usar para los elementos de JqueryUI.

Para ello se han descargado tres temas distintos de JqueryUI, dos de
ellos son temas oficiales de la comunidad (_Light_ y _Dark_) mientras
que el tema por defecto es un tema propio generado desde el Theme
Generator de JqueryUI (_ATAlgaba_).

Para cambiar de tema usamos un Dialog de JqueryUI que se puede abrir
gracias al botón de _Cambiar Tema_ que se puede encontrar al final del
formulario. En el dialog desplegado podremos encontrar tres imagenes
distintas, según se haga click en una u otra se cambiará la clase de
***body***, para ello hemos importado los css necesarios de cada tema y
hemos usado una función propia que limpia las clases de los temas y
aplica la elegida.

```javascript
$("#theme-switcher").dialog({
    autoOpen: false,
    show: {
        effect: "blind",
        duration: 1000
    },
    hide: {
        effect: "explode",
        duration: 1000
    }
});

$("#thsw").on("click", function () {
    $("#theme-switcher").dialog("open");
});

$("#sw-atalgaba").on("click", function () {
    themeSwitch('atalgaba')
});
$("#sw-light").on("click", function () {
    themeSwitch('light')
});
$("#sw-dark").on("click", function () {
    themeSwitch('dark')
});

function themeSwitch(newClass) {
    var body = $('body');
    body.removeClass("atalgaba");
    body.removeClass("light");
    body.removeClass("dark");
    body.addClass(newClass);
}
```

## Tarea 2 - Widget Autocomplete

En esta tarea hemos aplicado al Input "Pokemon" del formulario un array
con todos los Pokémons que existen actualmente (un total de 802). Dicho
array ha sido generado gracias a una API que nos devuelve un JSON con la
información de todos estos Pokémons.

```javascript
$.getJSON("https://raw.githubusercontent.com/cheeaun/repokemon/master/data/pokemon-list.json", function (data) {
    var items = [];
    $.each(data, function (id, pokemon) {
        items.push(pokemon.name);
    });

    $("#pokemon").autocomplete({
        source: items
    });
});
```

## Tarea 3 - Widget Datepicker

Para el desarrollo de esta tarea hemos implementado un selector de fecha
por rangos, permitiéndonos así elegir una fecha de inicio de reserva y
una fecha de final. Además se ha implementado una serie de opciones para
la traducción de dicho datepicker.

Nuestro selector de fechas funcionará completamente en castellano, no
sólo por los textos sino también en el formato de fecha. Además nos
limitará elegir fechas de finalización anteriores a las fechas de inicio
y viceversa.

## Tarea 4 - Efectos de JqueryUI

En este caso hemos añadido dos efectos distintos en el Dialog del
selector de temas. A la hora de mostrarse lo hará con un efecto _blind_
con una duración de medio segundo mientras que para cerrarse lo hará con
un efecto _explode_ con duración de 1 segundo.

```javascript
$("#theme-switcher").dialog({
    autoOpen: false,
    show: {
        effect: "blind",
        duration: 1000
    },
    hide: {
        effect: "explode",
        duration: 1000
    }
});
```

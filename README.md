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
    // quitamos todas las clases
    body.removeClass("atalgaba");
    body.removeClass("light");
    body.removeClass("dark");
    // añadimos la clase nueva
    body.addClass(newClass);
}
```

## Tarea 2 - Widget Autocomplete

En esta tarea hemos aplicado al Input "Pokemon" del formulario un array
con todos los Pokémons que existen actualmente (un total de 802). Dicho
array ha sido generado gracias a una API que nos devuelve un JSON con la
información de todos estos Pokémons.

Además, hemos añadido la opción de que al seleccionar un pokémon
concreto, la medalla del input group muestre la imagen del pokémon
elegido, pudiendo así obtener una previsualización de la selección.

```javascript
$.getJSON("https://raw.githubusercontent.com/cheeaun/repokemon/master/data/pokemon-list.json", function (data) {
    var items = [];
    $.each(data, function (id, pokemon) {
        items.push({value: pokemon.name.toLowerCase(), id: pokemon.id, name: pokemon.name});
    });

    $("#pokemon").autocomplete({
        source: items,
        focus: function (event, ui) {
            $("#pokemon").val(ui.item.name);
            return false;
        },
        select: function (event, ui) {
            $('#pokename').html('<img src="https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/' + ui.item.id + '.png?raw=true" style="width:100%;position:absolute; top:50%; left:50%; transform: translate(-50%, -50%);" />');
                // añadimos la imagen del pokemon al lateral del input
            return false;
        }
    }).autocomplete("instance")._renderItem = function (ul, item) {
        return $("<li>")
            .append("<div>" + item.name + "</div>")
            .appendTo(ul);
    };
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

Además controlamos gracias a minDate que la fecha de inicio no pueda ser
anterior al día de hoy y por ende la de finalización anterior a mañana.
Así como el alquiler mínimo será siempre de un día, nunca podremos
elegir el mismo día como recogida y devolución.

```javascript
var today = new Date();         // Inicializamos el día de hoy
var dateFormat = "dd/mm/yy",    // Especificamos nuestro formato de fecha
    from = $("#calinicio")
        .datepicker({
            defaultDate: "+1d",
            changeMonth: true,
            numberOfMonths: 1,
            dateFormat: dateFormat,
            minDate: today      // Elegimos como fecha mínima Hoy
        })
        .on("change", function () {
            to.datepicker("option", "minDate", new Date(getDate(this).getTime() + 86400000));
                                // Cambiamos la fecha mínima de entrega
                                // al día siguiente al elegido
        }),
    to = $("#calfin")
        .datepicker({
            defaultDate: "+3d",
            changeMonth: true,
            numberOfMonths: 1,
            dateFormat: dateFormat,
            minDate: new Date(today.getTime() + 86400000)
                                // Elegimos como fecha mínima Mañana
        })
        .on("change", function () {
            from.datepicker("option", "maxDate", new Date(getDate(this).getTime() - 86400000));
                                // Cambianos la fecha máxima de regocida
                                // al día anterior al elegido
        });
```

## Tarea 4 - Efectos de JqueryUI

En este caso hemos añadido dos efectos distintos en el Dialog del
selector de temas. A la hora de mostrarse lo hará con un efecto _blind_
con una duración de medio segundo mientras que para cerrarse lo hará con
un efecto _explode_ con duración de 1 segundo.

```javascript
$("#theme-switcher").dialog({
    autoOpen: false,
    // elegimos el efecto y la duración de aparición
    show: {
        effect: "blind",
        duration: 1000
    },
    // elegimos el efecto y la duración de cierre
    hide: {
        effect: "explode",
        duration: 1000
    }
});
```

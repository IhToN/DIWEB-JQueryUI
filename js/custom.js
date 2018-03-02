$(document).ready(function () {
        /* Theme Switcher */
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

        /* Autocomplete */
        $.getJSON("https://raw.githubusercontent.com/cheeaun/repokemon/master/data/pokemon-list.json", function (data) {
            var items = [];
            $.each(data, function (id, pokemon) {
                items.push(pokemon.name);
            });

            $("#pokemon").autocomplete({
                source: items
            });
        });

        /* Calendar Date Picker */
        $.datepicker.setDefaults($.datepicker.regional["es"]);
        var dateFormat = "dd/mm/yy",
            from = $("#calinicio")
                .datepicker({
                    defaultDate: "+1w",
                    changeMonth: true,
                    numberOfMonths: 2,
                    dateFormat: dateFormat
                })
                .on("change", function () {
                    to.datepicker("option", "minDate", getDate(this));
                }),
            to = $("#calfin").datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 2,
                dateFormat: dateFormat
            })
                .on("change", function () {
                    from.datepicker("option", "maxDate", getDate(this));
                });

        function getDate(element) {
            var date;
            try {
                date = $.datepicker.parseDate(dateFormat, element.value);
            } catch (error) {
                date = null;
            }

            return date;
        }
    }
);

/* Theme Switcher */
function themeSwitch(newClass) {
    var body = $('body');
    body.removeClass("atalgaba");
    body.removeClass("light");
    body.removeClass("dark");
    body.addClass(newClass);
}

/* Inicialización en español para la extensión 'UI date picker' para jQuery. */
/* Traducido por Vester (xvester@gmail.com). */
(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["../widgets/datepicker"], factory);
    } else {

        // Browser globals
        factory(jQuery.datepicker);
    }
}(function (datepicker) {

    datepicker.regional.es = {
        closeText: "Cerrar",
        prevText: "&#x3C;Ant",
        nextText: "Sig&#x3E;",
        currentText: "Hoy",
        monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthNamesShort: ["Ene", "Feb", "Mar", "abr", "May", "Jun",
            "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        dayNames: ["domingo", "lunes", "Martes", "miércoles", "jueves", "viernes", "sábado"],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
        dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
        weekHeader: "Sm",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    datepicker.setDefaults(datepicker.regional.es);

    return datepicker.regional.es;

}));
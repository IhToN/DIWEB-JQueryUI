$(document).ready(function () {
        /* Theme Switcher */
        $("#theme-switcher").dialog({
            autoOpen: false,
            show: {
                effect: "blind",
                duration: 500
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
                    return false;
                }
            }).autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>")
                    .append("<div>" + item.name + "</div>")
                    .appendTo(ul);
            };
        });

        /* Calendar Date Picker */
        $.datepicker.setDefaults($.datepicker.regional["es"]);
        var today = new Date();
        var dateFormat = "dd/mm/yy",
            from = $("#calinicio")
                .datepicker({
                    defaultDate: "+1d",
                    changeMonth: true,
                    numberOfMonths: 1,
                    dateFormat: dateFormat,
                    minDate: today
                })
                .on("change", function () {
                    to.datepicker("option", "minDate", new Date(getDate(this).getTime() + 86400000));
                }),
            to = $("#calfin")
                .datepicker({
                    defaultDate: "+3d",
                    changeMonth: true,
                    numberOfMonths: 1,
                    dateFormat: dateFormat,
                    minDate: new Date(today.getTime() + 86400000)
                })
                .on("change", function () {
                    from.datepicker("option", "maxDate", new Date(getDate(this).getTime() - 86400000));
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

        /* Otras cosas */
        var spinner = $("#cantidad").spinner({
            min: 1,
            max: 10
        });

        $('#vibrar').click(efectoUno);
    }
);

function efectoUno() {
    $("#vibrar").effect("bounce", {easing: "swing"}, 500, efectoDos);
}

function efectoDos() {
    $("#vibrar").effect("shake", {easing: "swing"}, 1000, efectoUno);
}

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
        monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
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

/*
    Menu
*/
(function () {
    'use strict';
    document['addEventListener']('touchstart', function () {
    }, false);
    $(function () {
        $('#wsnavtoggle')['on']('click', function () {
            $('.wsmenucontainer')['toggleClass']('wsoffcanvasopener');
            return false
        });
        $('#overlapblackbg')['on']('click', function () {
            $('.wsmenucontainer')['removeClass']('wsoffcanvasopener');
            return false
        });
        $('.wsmenu-list> li')['has']('.wsmenu-submenu')['prepend']('<span class="wsmenu-click"><i class="wsmenu-arrow fa fa-angle-down"></i></span>');
        $('.wsmenu-list > li')['has']('.megamenu')['prepend']('<span class="wsmenu-click"><i class="wsmenu-arrow fa fa-angle-down"></i></span>');
        $('.wsmenu-click')['on']('click', function () {
            $(this)['toggleClass']('ws-activearrow')['parent']()['siblings']()['children']()['removeClass']('ws-activearrow');
            $('.wsmenu-submenu, .megamenu')['not']($(this)['siblings']('.wsmenu-submenu, .megamenu'))['slideUp']('slow');
            $(this)['siblings']('.wsmenu-submenu')['slideToggle']('slow');
            $(this)['siblings']('.megamenu')['slideToggle']('slow');
            return false
        });
        $('.wsmenu-list > li > ul > li')['has']('.wsmenu-submenu-sub')['prepend']('<span class="wsmenu-click02"><i class="wsmenu-arrow fa fa-angle-down"></i></span>');
        $('.wsmenu-list > li > ul > li > ul > li')['has']('.wsmenu-submenu-sub-sub')['prepend']('<span class="wsmenu-click02"><i class="wsmenu-arrow fa fa-angle-down"></i></span>');
        $('.wsmenu-click02')['on']('click', function () {
            $(this)['children']('.wsmenu-arrow')['toggleClass']('wsmenu-rotate');
            $(this)['siblings']('.wsmenu-submenu-sub')['slideToggle']('slow');
            $(this)['siblings']('.wsmenu-submenu-sub-sub')['slideToggle']('slow');
            return false
        })
    })
}())
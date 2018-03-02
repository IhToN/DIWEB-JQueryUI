$(document).ready(function () {
        $.getJSON("https://raw.githubusercontent.com/cheeaun/repokemon/master/data/pokemon-list.json", function (data) {
            var items = [];
            $.each(data, function (id, pokemon) {
                items.push(pokemon.name);
            });

            $( "#search" ).autocomplete({
                source: items
            });
        });
    }
);
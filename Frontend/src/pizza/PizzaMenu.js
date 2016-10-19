/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $(".list-pizza");
var filter={
    meat: 0,
    pineapple:1,
    mushrooms:2,
    ocean:3
}
function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-button-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-button-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
    $(".pizza-counter").text(list.length);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        if(filter == 0){
        if(pizza.content.meat || pizza.content.chicken) {
            pizza_shown.push(pizza);
        }}
        else if(filter == 2){
            if(pizza.content.mushroom) {
                pizza_shown.push(pizza);
            }}
        else if(filter == 3){
            if(pizza.content.ocean) {
                pizza_shown.push(pizza);
            }}
        else if(filter == 1){
            if(pizza.content.pineapple) {
                pizza_shown.push(pizza);
            }}
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List);
    addFilters();


}
function addFilters() {
    function filterbuttonClick(button,filter) {
        $(".pizza-filter-button").removeClass("active");
        $(button).addClass("active");
        $(".title-text").text("Піци "+$(button).text().toLowerCase());
        filterPizza(filter);
    }
    $("#filter-button-meat").click(function (e) {
        filterbuttonClick("#filter-button-meat",filter.meat);
    });
    $("#filter-button-pineapples").click(function (e) {
        filterbuttonClick("#filter-button-pineapples",filter.pineapple);

    });
    $("#filter-button-mushrooms").click(function (e) {
        filterbuttonClick("#filter-button-mushrooms",filter.mushrooms);

    });
    $("#filter-button-seafood").click(function (e) {
        filterbuttonClick("#filter-button-seafood",filter.ocean);
    });
    $("#filter-button-all-pizza").click(function (e) {
        $(".pizza-filter-button").removeClass("active");
        $("#filter-button-all-pizza").addClass("active");
        $(".title-text").text("Усі піци");
        showPizzaList(Pizza_List);
    });
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;
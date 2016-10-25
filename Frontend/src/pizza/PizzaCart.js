/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage = require('./Storage')
var order_but = $(".button-order");
//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];
var $sumToPay = $(".order-sum-amount");
var $noItems = $(".holder")
var savedCart = Storage.get('cart');
if(savedCart){
    Cart = savedCart;
}
//HTML едемент куди будуть додаватися піци
var $cart = $(".cart-items");

function addToCart(pizza, size) {
    if(size == PizzaSize.Big ){
        var diagonal = 40;
        var weight = pizza.big_size.weight;
        var price = pizza.big_size.price;
    }
    else if(size == PizzaSize.Small){
        var diagonal = 30;
        var weight = pizza.small_size.weight;
        var price = pizza.small_size.price;
    }
    var in_cart = false;
    Cart.forEach(function (item) {
        if(item.pizza.title == pizza.title & item.diagonal == diagonal){
            item.quantity+=1;
            in_cart = true;
            return;
        }
    });
    if(!in_cart){
        Cart.push({
            pizza: pizza,
            diagonal: diagonal,
            weight: weight,
            price: price,
            quantity: 1
    });}

    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити
    var item_index = Cart.indexOf(cart_item);
    if(item_index > -1)
    {
        Cart.splice(item_index, 1);
    }
    //Після видалення оновити відображення
    updateCart();
}
function emptyCart() {
    Cart = [];
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...
    $(".empty-cart").click(emptyCart);
    order_but.click(function (e) {
        window.location = "/order.html";
    });
    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage
    Storage.set('cart',Cart);
    //Очищаємо старі піци в кошику
    $cart.html("");
    var sum = 0;
    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        sum += cart_item.price * cart_item.quantity;
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".btn-plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".btn-minus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity -= 1;
            if(cart_item.quantity == 0){
                removeFromCart(cart_item);
            }
            else
                {
                updateCart();
                }
        });
        $node.find(".remove-from-cart").click(function(){
            //Збільшуємо кількість замовлених піц
            removeFromCart(cart_item);
        });

        $cart.append($node);
    }

    if(Cart.length == 0){
        $cart.append($noItems.html());
    }
    Cart.forEach(showOnePizzaInCart);
    $sumToPay.html(sum+" грн");
    if(sum > 0){
        order_but.removeAttr("disabled");
    }
    else{
        order_but.attr("disabled", "disabled");
    }
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;
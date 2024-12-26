export let cart;

loadFromStorage();

export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart')) || [
        // {
        // productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        // quantity: '2',
        // deliveryOptionId: '2'
        // }
    ];
}

let cartQuantity = '';

export function saveToLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function calculateCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
}

export function addToCart(productId){
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = quantitySelector ? Number(quantitySelector.value) : 1;

    let matchingItem;
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });
        if(matchingItem){
            matchingItem.quantity += quantity;
        }else{
            cart.push({
                productId: productId,
                quantity: quantity,
                deliveryOptionId: '1'
            });
        }

        saveToLocalStorage();
}

export function deleteFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveToLocalStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToLocalStorage();
}
export let cart = JSON.parse(localStorage.getItem('cart')) || 0;

let cartQuantity = '';

function saveToLocalStorage(){
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
    const quantity = Number(quantitySelector.value);

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
                quantity: quantity
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
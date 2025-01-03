import {cart, deleteFromCart, updateDeliveryOption, saveToLocalStorage} from "../../../data/cart.js";
import { getProduct } from "../../../data/products.js";
import { calculateCartQuantity } from "../../../data/cart.js";
import { deliveryOptions, getDeliveryOption } from "../../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary(){

let cartHTML = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartHTML +=
    `
    <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
            Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
            <img class="product-image"
                src="${matchingProduct.image}">

            <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
                    Update
                </span>
                <input class="quantity-input js-quantity-input-${matchingProduct.id}" type="number"  min="0" placeholder="0">
                <span class="save-quantity-link link-primary js-save-quantity" data-product-id="${matchingProduct.id}">Save</span>
                <span class="delete-quantity-link link-primary js-delete-quantity-link js-delete-quantity-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                    Delete
                </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
        </div>
    `;
});

function deliveryOptionsHTML(matchingProduct, cartItem){
let html = '';

    deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = deliveryOption.priceCents === 0 ?'FREE' : `$${(deliveryOption.priceCents / 100).toFixed(2)}`;
        
    const isChecked = deliveryOption.id === (cartItem.deliveryOptionId);
    html +=
`
                <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" ${isChecked ?'checked' :''} class="delivery-option-input"
                    name="${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                    ${dateString}
                    </div>
                    <div class="delivery-option-price">
                    ${priceString} - Shipping
                    </div>
                </div>
                </div>
`
});
    return html;
}

const orderSummaryElement = document.querySelector('.js-order-summary');
if(orderSummaryElement){
    orderSummaryElement.innerHTML = cartHTML;
}

document.querySelectorAll('.js-delete-quantity-link').forEach((link) => {
link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    deleteFromCart(productId);

    renderOrderSummary();
    renderPaymentSummary();
});
});

document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');
    });
});

document.querySelectorAll('.js-save-quantity').forEach((link) => {
    link.addEventListener('click', () => {

        const productId = link.dataset.productId;
        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
        const newQuantity = Number(quantityInput.value);

        if(newQuantity === 0){
            deleteFromCart(productId);
        }

        updateCartQuantity(productId, newQuantity);
        renderOrderSummary();
        renderPaymentSummary();

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        if (container) {
            container.classList.remove('is-editing-quantity');
        }

        const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
        if (quantityLabel) {
            quantityLabel.innerHTML = newQuantity;
        }
        updateCartQuantity();
    });
});

function updateCartQuantity(productId, newQuantity) {
    const cartItem = cart.find((item) => item.productId === productId);

    if (cartItem) {
        cartItem.quantity = newQuantity;
    }

    const checkoutQuantityElement = document.querySelector('.js-checkout-quantity');
    if(checkoutQuantityElement){
        checkoutQuantityElement.innerHTML = `${calculateCartQuantity()} item${calculateCartQuantity() === 1 ? '' : 's'}`;
    }

    saveToLocalStorage();
}
updateCartQuantity();

document.querySelectorAll('.js-delivery-option').forEach((optionElement) => {
    optionElement.addEventListener('click', () => {
        const {productId, deliveryOptionId} = optionElement.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
    });
})

}



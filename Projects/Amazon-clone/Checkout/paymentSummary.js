import { cart, calculateCartQuantity } from "../../../data/cart.js";
import { getProduct } from "../../../data/products.js";
import { getDeliveryOption } from "../../../data/deliveryOptions.js";
import { addOrder } from "../../../data/orders.js";

export function renderPaymentSummary(){
    let paymentHTML = '';

    let productPriceCents = 0;
    let shippingPriceCents = 0;
    
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });
    
    const totalBeforeTax = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTax * 0.1;
    const totalCents = totalBeforeTax + taxCents;

    paymentHTML = `
        <div class="payment-summary-title">
                Order Summary
                </div>

                <div class="payment-summary-row">
                <div class="js-item-quantity">Items ():</div>
                <div class="payment-summary-money">$${(productPriceCents / 100).toFixed(2)}</div>
                </div>

                <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">$${(shippingPriceCents / 100).toFixed(2)}</div>
                </div>

                <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${(totalBeforeTax / 100).toFixed(2)}</div>
                </div>

                <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${(taxCents / 100).toFixed(2)}</div>
                </div>

                <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">$${(totalCents / 100).toFixed(2)}</div>
                </div>

                <button class="place-order-button button-primary js-place-order-btn">
                Place your order
                </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentHTML;
    updateSummaryItem();

    document.querySelector('.js-place-order-btn')
    .addEventListener('click', async () => {
        const response = await fetch('https://supersimplebackend.dev/orders', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({cart: cart})
        });
        const order = await response.json();
        addOrder(order);

        window.location.href = 'orders.html';
    });
}

function updateSummaryItem(){

    const itemQuantity = document.querySelector('.js-item-quantity');
    
    if (itemQuantity) {
        const cartQuantity = calculateCartQuantity();
        itemQuantity.innerHTML = `Items (${cartQuantity})`;
    }
}
updateSummaryItem();


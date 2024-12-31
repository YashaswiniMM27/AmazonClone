import { loadProducts, products } from "../../../data/products.js";
import { renderOrderSummary } from "../Checkout/orderSummary.js";
import { renderPaymentSummary } from "../Checkout/paymentSummary.js";
//import '../../../data/backend-practice.js'

Promise.all([
    loadProducts()
])
.then(() => {
    renderPaymentSummary();
    renderOrderSummary();
})


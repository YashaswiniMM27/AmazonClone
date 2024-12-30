    import { products } from "../../../data/products.js";
    import { addToCart, calculateCartQuantity, saveToLocalStorage } from "../../../data/cart.js";


    let productsHTML = '';

    products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src="${product.image}">
                </div>
    
                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>
    
                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="${product.getRatingUrl()}">
                    <div class="product-rating-count link-primary">
                    ${product.rating.count}
                    </div>
                </div>
    
                <div class="product-price">
                    ${product.getPrice()}
                </div>
    
                <div class="product-quantity-container">
                    <select class="js-quantity-selector-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>

                ${product.extraInfoHTML()}
    
                <div class="product-spacer"></div>
    
                <div class="added-to-cart js-added-to-cart-${product.id}">
                    <img src="/Images/Amazon-clone/icons/checkmark.png">
                    Added
                </div>
    
                <button class="add-to-cart-button button-primary js-add-to-cart" data-product-Id="${product.id}">
                    Add to Cart
                </button>
                </div>
    `;
    });

    document.querySelector('.js-products-grid').innerHTML = productsHTML;


    function updateCartQuantity(){
        const cartQuantity = calculateCartQuantity();
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
        saveToLocalStorage();
    }
    updateCartQuantity();

    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            addToCart(productId);
            updateCartQuantity();

            let setTimeoutId;
            const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
            addedMessage.classList.add('addedMessage');

            clearTimeout(setTimeoutId);

            setTimeoutId = setTimeout(() => {
                addedMessage.classList.remove('addedMessage');
            }, 1500);
            
        });
    });
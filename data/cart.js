export const cart = [];

export function addToCart(productId){
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelector.value);

    let matchingItem;
    cart.forEach((item) => {
        if(productId === item.productId){
            matchingItem = item;
        }
    });
        if(matchingItem){
            matchingItem.qauantity += quantity;
        }else{
            cart.push({
                productId: productId,
                qauantity: quantity
            });
        }
}
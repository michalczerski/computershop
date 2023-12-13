export function productUrl(product) {
    const name = product.name.toLowerCase()
        .replaceAll(" ", "-")
        .replaceAll("/", "-")
        .replaceAll("\", "-"");
    return "/" + name + "/" + product._id;
}

export function addToBasket(context, cookies, product) {
    const basket = context.basket;
    if (!basket.items.some(p => p.product._id === product._id)) {
        basket.items.push({product: product, qty: 0});
    }
    basket.items.find(p => p.product._id === product._id).qty++;
    basket.qty++;

    const refreshedBasket = {items: basket.items, qty: basket.qty};
    context.setBasket(refreshedBasket);
    cookies.set('basket', JSON.stringify(refreshedBasket));
}

export function productImageUrl(product) {
    return `/images/${product.url}`
}
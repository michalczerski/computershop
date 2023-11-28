'use server'

export async function makeOrder() {
    const order = {items: []};
    basket.items.map(item => { order.items.push(item.product); });

    const emptyBasket = {items: [], qty: 0}
    setBasket(emptyBasket);

    await fetch('http://localhost:3030/make-order', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Content-Type': 'application/json'
        }                     
    });
}
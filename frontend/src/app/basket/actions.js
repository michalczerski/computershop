'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function makeOrder() {
    const userCookie = cookies().get('user')?.value;
    const user = JSON.parse(userCookie);
    const basketCookie = cookies().get('basket')?.value;
    const basket = JSON.parse(basketCookie);
    const order = {
        userId: user._id,
        items: basket.items
    };

    await fetch(`${process.env.server}/make-order`, {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Content-Type': 'application/json'
        }                     
    });

   redirect("/account/orders");
}
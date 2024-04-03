'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function makeOrder() {
    const userCookie = cookies().get('user')?.value;
    const user = JSON.parse(userCookie);
    const basketCookie = cookies().get('basket')?.value;
    const basket = JSON.parse(basketCookie);
    const order = JSON.stringify({
        userId: user._id,
        items: basket.items
    });

    await fetch(`${process.env.server}/make-order`, {
        method: 'POST',
        body: order,
        headers: {
            'Content-Type': 'application/json'
        }                     
    });

   redirect("/account/orders");
}
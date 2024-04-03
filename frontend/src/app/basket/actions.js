'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function makeOrder(items) {
    const userCookie = cookies().get('user')?.value;
    const user = JSON.parse(userCookie);
    const order = JSON.stringify({
        userId: user._id,
        items: items
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
'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function makeOrder(prevState, formData) {
    const userCookie = cookies().get('user')?.value;
    const user = JSON.parse(userCookie);
    const basketCookie = cookies().get('basket')?.value;
    const basket = JSON.parse(basketCookie);
    const order = {userId: user._id, items: basket.items};

    await fetch('http://localhost:3030/make-order', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Content-Type': 'application/json'
        }                     
    });

   redirect("/account");
}
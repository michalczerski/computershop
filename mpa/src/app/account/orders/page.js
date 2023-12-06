import {cookies} from "next/headers";
import Orders from './orders';

export default async function Page() {
    const user = JSON.parse(cookies().get('user').value);
    const res = await fetch('http://localhost:3030/orders', {
        headers: {
            'user-id': user._id
        }
    });
    let orders = await res.json();


    return (
        <>
            <div className="w-full">
                {orders.length > 0 && <Orders orders={orders} /> }
                {orders.length === 0 && <div>You don't have any orders.</div>}
            </div>
        </>
    )
}
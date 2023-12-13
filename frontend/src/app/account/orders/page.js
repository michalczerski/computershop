import {cookies} from "next/headers";
import Orders from './orders';

export default async function Page() {
    const user = JSON.parse(cookies().get('user').value);
    const orders = await fetch(`${process.env.server}/orders`, {
        headers: {
            'user-id': user._id
        }
    }).then(r => r.json());

    return (
        <>
            <div className="w-full">
                {orders.length > 0 && <Orders orders={orders} /> }
                {orders.length === 0 && <div>You dont have any orders.</div>}
            </div>
        </>
    )
}
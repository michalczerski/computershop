import {cookies} from "next/headers";
import Image from "next/image";



export default async function Page() {
    const user = JSON.parse(cookies().get('user').value);
    const res = await fetch('http://localhost:3030/orders', {
        headers: {
            'user-id': user._id
        }
    });
    let orders = await res.json();

    function List({orders}) {
        const formatDate = (date) => {
            const leadingZeros = n =>  n < 10 ? `0${n}` : n;
            const obj = new Date(date);
            const y = obj.getFullYear();
            const m = leadingZeros(obj.getMonth() + 1);
            const d = leadingZeros(obj.getDate());
            return `${d}-${m}-${y}`;
        }
        const total = (items) => {
            return items.reduce((acc, item) => acc += (item.qty * item.product.priceUS), 0);
        }

        return (
            <>
                <div className="text-2xl">
                    <span className="font-semibold">Orders </span>
                    <span className="text-neutral-500">({orders.length})</span>
                </div>
                {orders.map(order =>
                    <div key={order._id} className="mt-7 hover:shadow-2xl border rounded-md p-5">
                        <div>
                            <span className="font-medium text-lg">Order </span>
                            <span className="text-neutral-400 text-sm">[#{order._id}] </span>
                            <span className="text-neutral-700 font-medium text-sm">{formatDate(order.date)}</span>
                        </div>
                        <ul key={order._id} className="divide-y">
                            {order.items.map(item =>
                                <li key={item.product._id} className="flex flex-row justify-between items-center
                                    pb-5 pt-5">
                                    <Image src={`http://localhost:3030/images/${item.product.url}`}
                                           width={64} height={55}
                                           alt={item.product.name} />
                                    <div className="flex-grow pl-5">{item.product.name}</div>
                                    <div className="qty">
                                        {item.qty} {item.qty > 1 ? 'pieces' : 'piece'}
                                    </div>
                                    <div className="w-16 text-right">{item.product.priceUS.toFixed(2)}$</div>
                                </li>
                            )}
                        </ul>
                        <div className="flex justify-end">
                            <div className="w-36 flex flex-row justify-between border-t pt-3">
                                <div className="">Total:</div>
                                <div className="font-semibold text-right">{total(order.items)}$</div>
                            </div>
                        </div>

                    </div>
                )}
            </>
        )
    }

    return (
        <>
            <div className="w-full">
                {orders.length > 0 && <List orders={orders} /> }
                {orders.length === 0 && <div>You don't have any orders.</div>}
            </div>
        </>
    )
}
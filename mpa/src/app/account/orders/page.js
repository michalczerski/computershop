import './account.scss'
import {cookies} from "next/headers";
import Image from "next/image";

export default async function Page() {
    const user = JSON.parse(cookies().get('user').value);
    const res = await fetch('http://localhost:3030/orders', {
        headers: {
            'user-id': user._id
        }
    });
    const orders = await res.json();

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
            <div id="orders-container">
                {orders.map(order =>
                    <div key={order._id}>
                        <div>Order [#{order._id}] {formatDate(order.date)}</div>
                        <ul className="order shadow box-border p-20" key={order._id}>
                            {order.items.map(item =>
                                <li key={item.product._id}>
                                    <div className="flex v-center">
                                        <Image src={`http://localhost:3030/images/${item.product.url}`}
                                               width={64} height={55}
                                               alt={item.product.name} />
                                        <div>{item.product.name}</div>
                                    </div>
                                    <div className="flex v-center">
                                        <div className="qty">{item.qty} piece</div>
                                        <div>{item.product.priceUS.toFixed(2)}$</div>
                                    </div>
                                </li>
                            )}
                            <li>podsumowanie {total(order.items)}$</li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}
import Image from "next/image";

export default function List({items, qty}) {

    const total = items.reduce((acc, item) => acc + item.product.priceUS * item.qty, 0);

    return (
        <>
            <div className="border-b">
                <div className="py-2 px-4 font-medium">
                    <span className="text-black">Basket </span>
                    <span className="text-gray-500">({qty})</span>
                </div>
            </div>
            <ul className="pt-4">
                {items.map(item =>
                    <li key={item.product._id}>
                        <div className="flex flex-row pb-7 px-4 w-full ">
                            <Image src={`http://localhost:3030/images/${item.product.url}`}
                                   height={55} width={64} alt={item.product.name} />
                            <div className="flex flex-col pl-2 justify-between w-full">
                                <div className="text-xs">{item.product.name}</div>
                                <div className="flex flex-row w-full justify-between">
                                    <div className="text-sm text-gray-500">
                                        {item.qty} {item.qty > 1 ? 'pieces' : 'piece'}
                                    </div>
                                    <div className="text-sm">{item.product.priceUS.toFixed(2)}$</div>
                                </div>
                            </div>
                        </div>
                    </li> )}
            </ul>
            <div className="bg-neutral-100 px-4 py-3 rounded-md flex flex-col">
                <div className="flex flex-row w-full justify-between">
                    <div>Total</div>
                    <div className="font-semibold">{total.toFixed(2)}$</div>
                </div>
                <a href="/basket" className="btn-p-g mt-3">Basket</a>
            </div>
        </>
    )
}
'use client'

export default function AddToBasketButton({computer}) {
    const total = Object.keys(computer).reduce((acc, part) => acc += computer[part].priceUS, 0);
    return (
        <div className="mt-3 w-full flex justify-between">
            <div className="text-lg font-extralight">{total.toFixed(2)}$</div>
            <button className="btn-p-g" onClick={() => alert('test')}>Add to basket</button>
        </div>
    )
}
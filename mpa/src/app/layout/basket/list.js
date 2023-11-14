'use client'

export default function List({items}) {
    return (
        <ul className="list">               
            {items.map(item => 
                <li key={item.product._id}>
                    {item.product.name} ({item.qty})
                </li> )}
        </ul>
    )
}
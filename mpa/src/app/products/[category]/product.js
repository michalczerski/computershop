import Image from 'next/image'
import AddToBasket  from './addtoBasekt';

export default function Product({ attributes, product }) {
  let path = `http://localhost:3030/images/${product.url}`;
  return (
      <div className="group w-1/3 hover:border-gray-300
            border border-white rounded-md py-3 px-3
            flex flex-col justify-between">
          <Image src={path} width={256} height={220} alt={product.name} />
          <div className="pb-2">{product.name}</div>
          <ul>
            {Object.keys(attributes).map(name =>
              <li key={name} className="text-sm">
                  <span className="capitalize">{name}</span>: {product[name]}
              </li>)}
          </ul>
          <div className="flex flex-row justify-between h-6">
              <span className="pt-2">{product.priceUS.toFixed(2)}$</span>
              <AddToBasket product={product} />
          </div>
      </div>
    )
}
  
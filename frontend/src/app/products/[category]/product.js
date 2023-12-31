import Image from 'next/image'
import AddToBasket from "@/app/products/[category]/addtoBasekt";
import {productUrl} from "@/components/product";

export default function Product({ attributes, product }) {

  return (
      <div className="group w-1/3 hover:border-gray-300
            border border-white rounded-md py-3 px-3
            flex flex-col justify-between">
          <a href={productUrl(product)} className="pb-2">
              <Image src={`/images/${product.url}`} width={256} height={220} alt={product.name} />
              {product.name}
          </a>
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
  
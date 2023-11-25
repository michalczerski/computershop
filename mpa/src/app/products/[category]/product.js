import Image from 'next/image'
import AddToBasket  from './addtoBasekt';

export default function Product({ attributes, product }) {
  let path = `http://localhost:3030/images/${product.url}`;
  return (
      <div className="product">
        <Image src={path} width={256} height={220} alt={product.name} />
        <h3>{product.name}</h3>
        <ul>
          {Object.keys(attributes).map(name => <li key={name}>{name}: {product[name]}</li>)}
        </ul>
        <div>{product.priceUS.toFixed(2)}$</div>
        <AddToBasket product={product} />
      </div>
    )
}
  
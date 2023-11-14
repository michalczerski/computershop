import './product.scss'
import Pagination from './pagination'
import Product from './product'
import Filter from './filter/filter';
import CheckList from './filter/checklist';
import Search  from './filter/search';

function queryParameters(searchParams) {
  const url = new URLSearchParams(searchParams);
  if (!url.has('p')) url.set('p', 1);

  return url.toString();
}

async function getProducts(query) {
  const res = await fetch('http://localhost:3030/products?' + query); 
  return res.json()
}

async function countProducts(query) {
  const res = await fetch('http://localhost:3030/count-products?' + query); 
  return res.text()  
}

async function getAttributes(query) {
  const res = await fetch('http://localhost:3030/attributes?' + query); 
  return res.json() 
}

export default async function Page({searchParams, params}) {
    searchParams.c = params.category;
    const query = queryParameters(searchParams);
    const products = await getProducts(query)
    const quantity = await countProducts(query);
    const attributes = await getAttributes(query);

    return (
        <div id="category">
          <Filter searchParams={searchParams}>
            <Search />
            {Object.keys(attributes).map(key => 
              <CheckList key={key} title={key} name={`search[${key}]`} items={attributes[key]} /> )}
          </Filter>
          <div id="products">
            <div id="box">
            {products.map(product => 
              <Product product={product} attributes={attributes} key={product._id} /> )}
            </div>
            <Pagination count={quantity} />
          </div>         
        </div>
      )
  }
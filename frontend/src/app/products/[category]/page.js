import Pagination from "@/app/products/[category]/pagination";
import Product from "@/app/products/[category]/product";
import Filter from "@/app/products/[category]/filter/filter";
import CheckList from "@/app/products/[category]/filter/checklist";
import Search from "@/app/products/[category]/filter/search";

function queryParameters(searchParams) {
    const url = new URLSearchParams(searchParams);
    if (!url.has('p')) url.set('p', 1);

    return url.toString();
}

async function getProducts(query) {
    return await fetch(`${process.env.server}/products?${query}`).then(r => r.json());
}

async function countProducts(query) {
   return await fetch(`${process.env.server}/count-products?` + query).then(r => r.text());
}

async function getAttributes(query) {
    return await fetch(`${process.env.server}/attributes?` + query).then(r => r.json());
}

export default async function Page({searchParams, params}) {
    searchParams.c = params.category;
    const query = queryParameters(searchParams);
    const products = await getProducts(query)
    const quantity = await countProducts(query);
    const attributes = await getAttributes(query);

    return (
        <>
            <div className="w-1/4">
              <Filter searchParams={searchParams}>
                <Search />
                {Object.keys(attributes).map(key =>
                  <CheckList key={key} title={key} name={`search[${key}]`} items={attributes[key]} /> )}
              </Filter>
            </div>
            <div className="w-3/4">
                {products.length > 0 &&
                    <div>
                        <div className="flex flex-wrap columns-3 pl-5">
                            {products.map(product =>
                                <Product product={product} attributes={attributes} key={product._id} /> )}
                        </div>
                        <div className="mr-3 mt-7 py-5 flex justify-end border-t border-t-neutral-200">
                            <Pagination count={quantity} />
                        </div>
                    </div>
                }
                {products.length === 0 && <div className="text-center text-xl">Products not found</div>}
            </div>
        </>
      )
  }
import Image from "next/image";
import {productImageUrl, productUrl} from "@/components/product";
import AddProductButton from "@/app/[name]/[id]/addProductButton";

export default async function Page({params}) {
    const product = await fetch(`${process.env.server}/product/${params.id}`).then(r => r.json());
    let imageUrl = productImageUrl(product);

    return (
        <>
            <div className="flex flex-row w-full">
                <div className="w-2/3">
                    <Image src={imageUrl} width={617} height={530} alt={product.name} />
                </div>
                <div className="w-1/3">
                    <a href={productUrl(product)} className="text-xl">{product.name}</a>
                    <div className="flex flex-row justify-between h-6">
                        <span className="pt-2">{product.priceUS.toFixed(2)}$</span>
                    </div>
                    <AddProductButton product={product} />
                </div>
            </div>
        </>
    )
}
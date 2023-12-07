import {productImageUrl, productUrl} from "@/components/product";
import Image from "next/image";
import AddToBasketButton from "@/app/sets/addToBasketButton";

export default  function Computers({computers}) {
    return (
        <>
            {computers.map((computer, idx) =>
                <div key={'computer-' + idx}>
                    <div className="mb-2 text-xl">Recomended {idx === 0 ? "Intel": "AMD"} computer set</div>
                    <div className="w-full border rounded-md p-2 py-3 shadow-2xl mb-14">
                        <div className="flex flex-row justify-between">
                            {Object.keys(computer).map(part =>
                                <a key={computer[part]._id} href={productUrl(computer[part])} className="flex flex-col">
                                    <Image src={productImageUrl(computer[part])}
                                           width={128} height={110}
                                           alt={computer[part].title} />
                                    {computer[part].title}
                                </a>
                            )}
                        </div>
                        <AddToBasketButton computer={computer} />
                    </div>
                </div>
            )}
        </>
    )
}
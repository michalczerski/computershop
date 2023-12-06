'use client'

import {useCookies} from "next-client-cookies";
import {useContext} from "react";
import {addToBasket} from "@/components/product";
import {BasketContext} from "@/app/layout/context-provider";

export default function AddProductButton({product}) {
    const cookies = useCookies();
    const context = useContext(BasketContext);

    return (
        <>
            <button onClick={() => addToBasket(context, cookies, product)}
                    className="btn-p-g mt-5 w-full">Add to basket</button>
        </>
    )
}
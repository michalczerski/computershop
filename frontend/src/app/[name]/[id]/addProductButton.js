'use client'

import {useCookies} from "next-client-cookies";
import {useContext} from "react";
import {addToBasket} from "@/components/product";
import {Context} from "@/app/context";

export default function AddProductButton({product}) {
    const cookies = useCookies();
    const context = useContext(Context);

    return (
        <>
            <button onClick={() => addToBasket(context, cookies, product)}
                    className="btn-p-g mt-5 w-full">Add to basket</button>
        </>
    )
}
'use client'

import Image from "next/image";
import {useFormState} from "react-dom";
import {useState} from "react";
import {logout} from "@/app/layout/header/account/actions";
import {useCookies} from "next-client-cookies";

export default function Account() {
    const cookies = useCookies();
    const cookieUser = cookies.get('user')
    const user = cookieUser ? JSON.parse(cookieUser) : false;

    const MenuLogged = ({user}) => {
        const [state, formAction] = useFormState(logout);

        return (
            <>
                <div className="flex flex-col text-sm text-gray-700">
                    <div className="py-2 px-2">
                        <span className="text-gray-500">Hello, </span>
                        <span className="font-medium text-black">{user.firstName}</span>
                    </div>

                    <div className="hover:bg-gray-100">
                        <a className="flex flex-row px-2 py-1"  href="/account/orders">
                            <Image src="/orders.svg" width={24} height={24} alt="orders" />
                            Orders
                        </a>
                    </div>
                    <div className="hover:bg-gray-100">
                        <a className="flex flex-row px-2 py-1" href="/account">
                            <Image src="/account.svg" width={24} height={24} alt="account" />
                            Account
                        </a>
                    </div>

                    <div className="border-t mt-3 w-full flex items-center">
                        <form className="m-auto" action={formAction}>
                            <button className="my-1 text-xs text-gray-500 rounded-md
                                px-5 hover:bg-gray-100 hover:text-black ">
                                Logout
                            </button>
                        </form>
                    </div>

                </div>
            </>
        )
    }

    const MenuLogIn = () => {
        return (
            <>
                <div className="p-3">
                    <form action="/login">
                        <button className="btn-p-s w-full">Login</button>
                    </form>
                    <div className="text-xs text-gray-500 py-2 text-center">or if you don't have account</div>
                    <form action="/register">
                        <button className="btn-s-s w-full">Register</button>
                    </form>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="group w-20 mt-1
                    border border-b-0 border-white hover:border-gray-200
                    rounded-t-md hover:shadow-md relative">

                <a href={user ? "/account/orders" : "/login"} className="w-full">
                    <Image className="m-auto" src="/account.svg" alt="account"
                           height={32} width={32} />
                    <div className="text-xxs text-center">Account</div>
                </a>

                <div className="group-hover:block hidden
                        w-52 absolute bg-white
                        border border-gray-200
                        rounded-b-md rounded-tl shadow-md
                        right-[-1px] top-[51px] ">
                    <div className="bg-white top-[-1px] w-[78px] h-1 absolute right-[0px]"></div>
                    {user && <MenuLogged user={user}/>}
                    {!user && <MenuLogIn />}
                </div>
            </div>
        </>
    )
}
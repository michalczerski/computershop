"use client"

import { useFormState } from 'react-dom'
import { addUser } from './actions';

export default function Page() {
    const initialState = {  }
    const [state, formAction] = useFormState(addUser, initialState);

    const errorClass = "text-sm text-red-600 pt-0.5 pl-2 mb-2";

    return (
        <>
            <div className="w-2/5 m-auto rounded-md border">
                <div className="p-5 font-semibold text-lg">Register</div>
                <div className="px-5 p-3 bg-neutral-100 rounded-md shadow-2xl">
                    <form action={formAction}>
                        <input placeholder='Username' type="text" name="username" />
                        <div className={errorClass}>{state?.username}</div>
                        <input placeholder='Email' type="email" name="email"/>
                        <div className={errorClass}>{state?.email}</div>
                        <input placeholder='First Name' type="text" name="firstName" />
                        <div className={errorClass}>{state?.firstName}</div>
                        <input placeholder='Last name' type="text" name="lastName" />
                        <div className={errorClass}>{state?.lastName}</div>
                        <input placeholder='City' type="text" name="city"/>
                        <div className={errorClass}>{state?.city}</div>
                        <input placeholder='Street' type="text" name="street"/>
                        <div className={errorClass}>{state?.street}</div>
                        <input placeholder='Post code' type="text" name="postCode"/>
                        <div className={errorClass}>{state?.postCode}</div>
                        <input placeholder='Password' type="password" name="password"/>
                        <div className={errorClass}>{state?.password}</div>
                        <button className="btn-p-g w-full mt-3">Register</button>
                    </form>
                </div>
            </div>
        </>
    )
}
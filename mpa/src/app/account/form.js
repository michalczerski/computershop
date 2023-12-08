"use client"

import {useFormState, useFormStatus} from "react-dom";
import {updateAccount} from "@/app/account/action";

export default function Form({account}) {
    const initialState = {  }
    const [state, formAction] = useFormState(updateAccount, initialState);


    const SubmitButton = () => {
        const {pending} = useFormStatus();

        return (
            <>
                <button className="btn-p-g w-full mt-3">{pending ? 'Submiting ...' : 'Update'}</button>
            </>
        )
    }

    return (
        <>
            <form className="form" action={formAction}>
                <input className="row" placeholder='Username' type="text"
                       name="username" disabled={true} value={account.username} />
                <input className="row" placeholder='Email' type="email"
                       name="email" disabled={true} value={account.email} />
                <input className="row" placeholder='First Name' type="text"
                       name="firstName" disabled={true} value={account.firstName} />
                <input className="row" placeholder='Last name' type="text"
                       name="lastName" disabled={true} value={account.lastName} />
                <input className="row" placeholder='City' type="text"
                       name="city" defaultValue={account.city}/>
                <div className="form-error">{state?.city}</div>
                <input className="row" placeholder='Street' type="text"
                       name="street" defaultValue={account.street}/>
                <div className="form-error">{state?.street}</div>
                <input placeholder='Post code' type="text"
                       name="postCode" defaultValue={account.postCode}/>
                <div className="form-error">{state?.postCode}</div>

                <SubmitButton />
            </form>
        </>
    )
}
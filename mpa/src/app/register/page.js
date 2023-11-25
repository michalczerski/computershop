"use client"

import './page.scss';
import { useFormState } from 'react-dom'
import { addUser } from './actions';

export default function Page() {
    const initialState = {  }
    const [state, formAction] = useFormState(addUser, initialState);

    return (
        <>
            <div id="register-page">
                <div id="register-box">
                    <h2>Register</h2>
                    <form action={formAction}>
                        {state?.valid}
                        <input placeholder='Username' type="text" name="username" />
                        {state?.username}
                        <input placeholder='Email' type="email" name="email"/>
                        {state?.email}
                        <input placeholder='First Name' type="text" name="firstName" />
                        {state?.firstName}
                        <input placeholder='Last name' type="text" name="lastName" />
                        {state?.lastName}
                        <input placeholder='City' type="text" name="city"/>
                        {state?.city}
                        <input placeholder='Street' type="text" name="street"/>
                        {state?.street}
                        <input placeholder='Post code' type="text" name="postCode"/>
                        {state?.postCode}
                        <input placeholder='Password' type="password" name="password"/>
                        {state?.password}
                        <button>Register</button>
                    </form>
                </div>
            </div>
        </>
    )
}
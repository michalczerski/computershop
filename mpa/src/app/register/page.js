"use client"

import './page.scss';
import { useFormState } from 'react-dom'
import { addUser } from './addUser';

const initialState = {
    message: null
}

export default function Page() {
    const [state, formAction] = useFormState(addUser, initialState);

    return (
        <>
            <div id="register-page">
                <div id="register-box">
                    <h2>Register</h2>
                    <form action={formAction}>
                        <input placeholder="Username" type="text" name="username" />
                        <input placeholder="Email" type="email" />
                        <input placeholder="City" type="text" />
                        <input placeholder="Street" type="text" />
                        <input placeholder="Post code" type="text" />
                        <input placeholder="Password" type="password"  />
                        <input placeholder="Password" type="password"  />
                        {state?.message}
                        <button>Register</button>
                    </form>
                </div>
            </div>
        </>
    )
}
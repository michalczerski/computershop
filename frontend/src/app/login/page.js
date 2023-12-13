"use client"

import { useFormState, useFormStatus } from 'react-dom'
import { useState, useEffect } from 'react';
import { login } from './actions';

function Submit({onPending}) {
    const {pending} = useFormStatus();
    useEffect(() => { if (pending) onPending(); })
    return (
        <>
            <button className="btn-p-g" type="submit">Log in</button>
        </>
    )
}

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [state, formAction] = useFormState(login, {valid: true});  

    const clearForm = () => {
        setTimeout(() => {
            setUsername("");
            setPassword("");
        }, 100)
    }

    return (
        <>
            <div className="w-2/5 m-auto rounded-md border">
                <div className="p-5 font-semibold text-lg">Log in</div>
                <div className="px-5 p-3 bg-neutral-100 rounded-md shadow-2xl">
                    <div>
                        <form className="flex flex-col" action={formAction} >
                            <input name="username" placeholder="Username"
                                   className="mb-2 "
                                   value={username}  onChange={e => setUsername(e.target.value)}
                                   type="text" />
                            <input name="password" placeholder="Password"
                                   value={password} onChange={e => setPassword(e.target.value)}
                                   type="password" />
                            <div className="text-sm text-red-600 pt-0.5 pl-2 mb-5">
                                {state?.valid ? "" : "Username doesn't exist or password is incorrect"}
                            </div>
                            <Submit onPending={clearForm} />
                            <div className="py-2 text-gray-500">or if you dont have account</div>
                            <a className="btn-s-g " href="/register">Register</a>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
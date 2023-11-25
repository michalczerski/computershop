"use client"

import './page.scss';
import { useFormState, useFormStatus } from 'react-dom'
import { useState, useEffect } from 'react';
import { login } from './actions';

function Submit({onPending}) {
    const {pending} = useFormStatus();
    useEffect(() => { if (pending) onPending(); })
    return (
        <>
            <button type="submit">Log in</button>        
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
            <div id="login-page">
                <div id="login-box">
                    <h2>Log in</h2>
                    <form action={formAction} >
                        <input name="username" placeholder="Username" 
                            value={username}  onChange={e => setUsername(e.target.value)}
                            type="text" />
                        <input name="password" placeholder="Password"
                            value={password} onChange={e => setPassword(e.target.value)}
                             type="password" />
                        {state?.valid ? "" : "Username doesn't exist or password is incorrect"}
                        <Submit onPending={clearForm} />
                        <div>or if you dont' have account</div>
                        <div id="register-button">
                            <a href="/register">Register</a>
                        </div>                    
                    </form>
                </div>
            </div>
        </>
    )
}
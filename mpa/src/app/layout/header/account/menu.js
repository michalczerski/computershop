'use client'

import { logout } from './actions'
import { useFormState } from 'react-dom'

export default function Menu() {
    const [state, formAction] = useFormState(logout);  

    return (
        <>
            <div className="account-menu">
                <form action={formAction}>
                    <button>Logout</button>
                </form>
            </div>        
        </>
    )
}
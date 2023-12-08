"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(prevState, formData) {
    const credentials = {
        username: formData.get("username"),
        password: formData.get("password")
    }
    const res = await fetch('http://localhost:3030/login-customer', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store'            
    });
    if (res.status === 200) {
        const user = await res.text();
        cookies().set("user", user);
        redirect("/");
    } else {
        return {valid: false};
    }
}
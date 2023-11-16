"use server"

import { redirect } from 'next/navigation'

export async function addUser(prevState, formData) {
    console.log(formData.entries());
    if (formData.get("username") == "") {
        return {
            message: "username is empty"
        };
    }

    redirect("/login");
}
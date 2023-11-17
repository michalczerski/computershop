"use server"

import { redirect } from 'next/navigation'

export async function addUser(prevState, formData) {
    const fields = ["username", "email", "firstName", "lastName", "city", 
        "street", "postCode", "password"];

    const isNullOrEmpty = (string) => {return (string == "" || string == null);}
    let result = {valid: true};
    fields.map(function(field) { 
        if (isNullOrEmpty(formData.get(field))) {
            result.valid = false;
            result[field] = `It's required.`;
        }
    });
    console.log(prevState);
    if (!result.valid) {
        return result;
    } else {
        redirect("/login");
    }
}
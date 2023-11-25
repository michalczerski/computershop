"use server"

import { redirect } from 'next/navigation'

export async function addUser(prevState, formData) {
    const customer = {username: null, email: null, firstName: null, 
        lastName: null, city: null, street: null, postCode: null, password: null};

    const isNullOrEmpty = (string) => {return (string == "" || string == null);}
    let result = {valid: true};
    Object.keys(customer).map(function(field) { 
        const value = formData.get(field);
        if (isNullOrEmpty(value)) {
            result.valid = false;
            result[field] = `It's required.`;
        }

        customer[field] = value;
    });

    if (!result.valid) {
        return result;
    } else {
        await fetch('http://localhost:3030/add-customer', {
            method: 'POST',
            body: JSON.stringify(customer),
            headers: {
                'Content-Type': 'application/json'
            }            
        }); 
        redirect("/login");
    }
}
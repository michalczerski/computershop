"use server"

import {useUser} from "@/components/hooks/user-server";

export async function updateAccount(prevState, formData) {
    const [isLoged, user] = useUser();

    const data = {
        city: formData.get('city'),
        street: formData.get('street'),
        postCode: formData.get('postCode')
    }

    await fetch(`http://localhost:3030/account/update/${user._id}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
"use server"

import {useUser} from "@/components/hooks/user-server";

export async function UpdateAccount(prevState, formData) {
    const [, user] = useUser();

    const data = {
        city: formData.get('city'),
        street: formData.get('street'),
        postCode: formData.get('postCode')
    }

    await fetch(`${process.env.server}/account/update/${user._id}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
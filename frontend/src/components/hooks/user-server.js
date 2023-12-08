import {cookies} from "next/headers";

export function useUser() {
    let user = {};
    let loggedIn = false;

    if (cookies().has('user')) {
        loggedIn = true;
        user = JSON.parse(cookies().get('user').value);
    }

    return [loggedIn, user];
}
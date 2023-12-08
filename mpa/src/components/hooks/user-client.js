import {useCookies} from "next-client-cookies";

export function useUser() {
    let user = {};
    let loggedIn = false;

    const cookies = useCookies();
    const stringUser = cookies.get('user');
    if (stringUser) {
        loggedIn = true;
        user = JSON.parse(cookies.get('user'));
    }

    return [loggedIn, user];
}
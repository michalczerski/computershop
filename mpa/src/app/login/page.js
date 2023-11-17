import './page.scss';
import { redirect } from 'next/navigation'

export default async function Login() {
    async function login() {
        "use server"

        redirect('/');
    }

    return (
        <>
            <div id="login-page">
                <div id="login-box">
                    <h2>Log in</h2>
                    <form action={login}>
                        <input placeholder="Username" type="text"  />
                        <input placeholder="Password" type="password"  />
                        <button>Log in</button>
                        <div>
                            or if you dont' have account <a  href="/register">Register</a>    
                        </div>
                                            
                    </form>
                </div>
            </div>
        </>
    )
}
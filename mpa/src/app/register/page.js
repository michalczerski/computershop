
import './page.scss';
import { redirect } from 'next/navigation'

export default async function Page() {
    const register = async (formData) => {
        "use server"

        console.log(formData);

        redirect("/login");
    }

    return (
        <>
            <div id="register-page">
                <div id="register-box">
                    <h2>Register</h2>
                    <form action={register}>
                        <input placeholder="Username" type="text" name="username" />
                        <input placeholder="Email" type="email" />
                        <input placeholder="City" type="text" />
                        <input placeholder="Street" type="text" />
                        <input placeholder="Post code" type="text" />
                        <input placeholder="Password" type="password"  />
                        <input placeholder="Password" type="password"  />
                        <button>Register</button>
                    </form>
                </div>
            </div>
        </>
    )
}
import Form from "@/app/account/form";
import {useUser} from "@/components/hooks/user-server";

export default  async function Account() {
    const [{}, user] = useUser();
    const account = await fetch(`http://localhost:3030/account/${user._id}`).then(r => r.json());

    return (
        <>
            <div className="w-2/5 m-auto rounded-md border">
                <div className="p-5 font-semibold text-lg">Account </div>
                <div className="px-5 p-3 bg-neutral-100 rounded-md shadow-2xl">
                    <Form account={account} />
                </div>
            </div>
        </>
    )
}
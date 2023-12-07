import Computers from "@/app/sets/computers";

export default async function Main() {
    const computers = await fetch("http://localhost:3030/computer-sets").then(r => r.json());

    return (
        <div className="w-full pt-5">
            <Computers computers={computers} />
        </div>
    )
}

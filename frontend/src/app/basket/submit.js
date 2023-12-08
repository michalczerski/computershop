import {useFormStatus} from "react-dom";
import {useEffect, useState} from "react";

export function SubmitButton({onFinish}) {
    const [clicked, setClicked] = useState(false);
    const {pending} = useFormStatus();

    useEffect(() => {
        if (pending) setClicked(true);
        if (!pending && clicked) {
            setClicked(false);
            onFinish();
        }
    });

    return (
        <>
            <button className="btn-p-g w-full mt-5">Make order</button>
        </>
    )
}
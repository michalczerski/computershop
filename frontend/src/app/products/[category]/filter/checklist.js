export default function CheckList({title, name, items, searchParams}) {
    let status = [];
    items.map((item, index) => {
        status[index] = searchParams[name] == item || 
            (searchParams[name] instanceof Array && searchParams[name].includes(item));
    });
    return (
        <div className="mt-5">
            <div className="capitalize mb-2">{title}</div>
            <ul>
                {items.map((item, index) => 
                    <li key={item}>
                        <input type="checkbox"
                                className="border-emerald-300"
                                name={name} value={item} id={item}
                                defaultChecked={status[index]} />
                        <label className="ml-2" htmlFor={item}>{item}</label>
                    </li>
                )}
            </ul>
        </div>
    )
}
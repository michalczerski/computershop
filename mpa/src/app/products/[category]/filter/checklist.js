import './checklist.scss'

export default function CheckList({title, name, items, searchParams}) {
    let status = [];
    items.map((item, index) => {
        status[index] = searchParams[name] == item || 
            (searchParams[name] instanceof Array && searchParams[name].includes(item));
    });
    return (
        <div className="checklist">
            <div className="title">{title}</div>
            <ul>
                {items.map((item, index) => 
                    <li key={item}>
                        <input type="checkbox" name={name} value={item} id={item} 
                            defaultChecked={status[index]} />
                        <label htmlFor={item}>{item}</label>
                    </li>
                )}
            </ul>
        </div>
    )
}
export default function Search({searchParams}) {
    return (
        <div>
            <input placeholder="Search"
                   type="text" name="q" defaultValue={searchParams['q']} />
        </div>
    )    
}
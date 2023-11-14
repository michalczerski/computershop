export default function Search({searchParams}) {
    return (
        <div><input type="text" name="q" defaultValue={searchParams['q']} /></div>        
    )    
}
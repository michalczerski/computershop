export default function Search({searchParams}) {
    return (
        <div>
            <input className="placeholder:italic placeholder:text-slate-400 block
                    bg-white text-sm w-full text-neutral-800
                    border border-slate-300 rounded-md py-1 px-2 shadow-sm
                    focus:outline-none focus:border-b-gray-300 focus:ring-blue-200 focus:ring-1"
                   placeholder="Search"
                   type="text" name="q" defaultValue={searchParams['q']} />
        </div>
    )    
}
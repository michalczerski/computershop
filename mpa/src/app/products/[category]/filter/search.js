export default function Search({searchParams}) {
    return (
        <div>
            <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-2/3
                    border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm
                    focus:outline-none focus:border-b-gray-300 focus:ring-blue-200 focus:ring-1 sm:text-sm"
                   placeholder="Search"
                   type="text" name="q" defaultValue={searchParams['q']} />
        </div>
    )    
}
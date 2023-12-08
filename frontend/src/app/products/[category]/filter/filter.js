import React from 'react'

export default function Filter({children, searchParams}) {
    return (
      <div className="border rounded-md p-3">
        <form method="GET">
              {React.Children.map(children, child => {
                return React.cloneElement(child, {searchParams: searchParams} );
              })}
            <input type="hidden" name="p" value="1" />
            <button className="btn-p-g mt-5 w-full">Search</button>
        </form>
      </div>
    )
  }
  
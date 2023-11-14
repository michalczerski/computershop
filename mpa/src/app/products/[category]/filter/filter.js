import React from 'react'

export default function Filter({children, searchParams}) {
    return (
      <div id="filter">
        <form method="GET">
          {React.Children.map(children, child => {
            return React.cloneElement(child, {searchParams: searchParams} );
          })}
          <input type="hidden" name="p" value="1" />
          <input type="submit" value="search" />
        </form>
      </div>
    )
  }
  
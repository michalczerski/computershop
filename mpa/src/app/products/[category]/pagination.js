
'use client'

import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'

export default function Pagination({ count }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const pages = Math.ceil(count / 15);
    let current = parseInt(searchParams.get("p") ?? 1);
    if (current < 1) current = 1;
    if (current > pages) current = pages;

    const next = new URLSearchParams(searchParams);
    next.set('p', current + 1);

    const prev = new URLSearchParams(searchParams);
    prev.set('p', current - 1);

    return (
      <div>
        {(current > 1) && 
            <Link  href={{ pathname: pathname, query: prev.toString()}}> Previous </Link> }
        {current} / {pages} 
        {(current < pages ) && 
            <Link  href={{ pathname: pathname, query: next.toString()}}> Next </Link>}
      </div>
    )
  }
  
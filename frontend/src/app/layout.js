import { CookiesProvider } from 'next-client-cookies/server';
import { ContextProvider } from "@/app/context-provider";
import Categories from "@/components/header/categories";
import Header from "@/components/header/header";

import './global.css';

export const revalidate = 1;

export const metadata = {
  title: 'Computer shop',
  description: 'Computer shop'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-light leading-none" >
        <CookiesProvider>
          <ContextProvider>
            <Header />
            <Categories />
            <div className="container mx-auto flex mt-5" >{children}</div>
          </ContextProvider>
        </CookiesProvider>
      </body>
    </html>
  )
}

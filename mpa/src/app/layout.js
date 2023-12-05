import { ContextProvider } from "./layout/context-provider";
import { CookiesProvider } from 'next-client-cookies/server';
import Categories from "./layout/header/categories"
import Header from "./layout/header/header"

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

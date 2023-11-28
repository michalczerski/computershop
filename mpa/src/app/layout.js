import { ContextProvider } from "./layout/context-provider";
import { CookiesProvider } from 'next-client-cookies/server';
import Categories from "./layout/header/categories"
import Content from "./layout/content"
import Header from "./layout/header/header"

import './layout/global.scss';

export const revalidate = 1;

export const metadata = {
  title: 'Computer shop',
  description: 'Computer shop'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CookiesProvider>
          <ContextProvider>
            <Header />
            <Categories />
            <Content>{children}</Content>  
          </ContextProvider>
        </CookiesProvider>
      </body>
    </html>
  )
}

import { Context } from "./layout/context";
import Categories from "./layout/categories"
import Content from "./layout/content"
import Header from "./layout/header"

export const revalidate = 1;

export const metadata = {
  title: 'Computer shop',
  description: 'Computer shop'
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        <Context>
          <Header />
          <Categories />
          <Content>{children}</Content>  
        </Context>
      </body>
    </html>
  )
}

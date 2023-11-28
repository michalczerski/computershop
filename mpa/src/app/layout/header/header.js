import './header.scss'
import Basket from './basket/basket'
import Login from './login'
import Account from './account/account';
import { cookies } from 'next/headers'
import Image from 'next/image'

export default function Header() {
  const user = cookies().get('user')?.value

  return (
    <div id="headerOuter">
      <div id="headerInner">
          <a href="/"><Image src="/logo.png" 
            width={280} height={54} priority={true} alt="computer shop"/></a>
          <div id="header-panel">
            {!user && <Login />}
            {user && <Account />}
            {<Basket />}
          </div>
      </div>
    </div>
  )
}

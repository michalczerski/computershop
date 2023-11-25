import './header.scss'
import Basket from './basket/basket'
import Login from './login'
import Account from './account';
import { cookies } from 'next/headers'

export default function Header() {
  const user = cookies().get('user')?.value

  return (
    <div id="headerOuter">
      <div id="headerInner">
          <div>ComputerShop</div> 
          <div id="header-panel">
            {!user && <Login />}
            {user && <Account />}
            {<Basket />}
          </div>
      </div>
    </div>
  )
}

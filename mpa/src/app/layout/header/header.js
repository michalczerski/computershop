import './header.scss'
import Basket from './basket/basket'
import Login from './login'
import Account from './account';

export default function Header() {
  const loggedIn = false;

  return (
    <div id="headerOuter">
      <div id="headerInner">
          <div>ComputerShop</div> 
          <div id="header-panel">
            {!loggedIn && <Login />}
            {loggedIn && <Account />}
            {<Basket />}
          </div>
      </div>
    </div>
  )
}

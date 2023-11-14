import './header.scss'
import Basket from './basket/basket'

export default function Header() {
  return (
    <div id="headerOuter">
      <div id="headerInner">
          <div>ComputerShop</div> 
          <div>
            <Basket />      
          </div>
      </div>
    </div>
  )
}

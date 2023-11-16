import Image from 'next/image'
import './categories.scss'

export default function Categories() {
    return (
      <div id="categoriesOuter">
        <div id="categoriesInner">
          <a href="/products/processors">
            <Image src="/images/cpu.png" width={24} height={24} alt="processors"/>
            Processors
          </a>
          <a href="/products/motherboards">
            <Image src="/images/motherboard.png" width={24} height={24} alt="motherboards"/>
            Motherboards
            </a>
          <a href="/products/storage">
            <Image src="/images/ssd-card.png" width={24} height={24} alt="storage" />
            Storage
          </a>
          <a href="/products/memories">
            <Image src="/images/ram.png" width={24} height={24} alt="memories" />
            Memory
          </a>
          <a href="/products/graphiccards">
            <Image src="/images/graphic-card.png" width={24} height={24} alt="graphic cards"/>
            Graphic Cards
          </a> 
          <a href="/products/powersupplies">
            <Image src="/images/power-supply.png" width={24} height={24} alt="power supplies" />
            Power supply
          </a>
          <a href="/products/computercases">
            <Image src="/images/cases.png" width={24} height={24} alt="computer cases"/>
            Cases
          </a>
          <a href="/products/displays">
            <Image src="/images/monitor.png" width={24} height={24} alt="displays" />
            Displays
          </a>                   
        </div>
      </div>
    )
  }
  
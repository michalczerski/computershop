import Image from 'next/image'

export default function Categories() {
    return (
      <div className="w-full bg-gray-200">
        <div className="h-12 px-2 flex justify-between items-center container mx-auto text-xxs">
          <a href="/products/processors" className="hover:bg-white hover:rounded-md flex p-2">
            <Image  src="/images/cpu.png" width={24} height={24} alt="processors"/>
            <span className="flex items-center pl-1">Processors</span>
          </a>
          <a href="/products/motherboards" className="hover:bg-white hover:rounded-md flex p-2">
            <Image src="/images/motherboard.png" width={24} height={24} alt="motherboards"/>
            <span className="flex items-center pl-1">Motherboards</span>
            </a>
          <a href="/products/storage" className="hover:bg-white hover:rounded-md flex p-2">
            <Image src="/images/ssd-card.png" width={24} height={24} alt="storage" />
            <span className="flex items-center pl-1">Storage</span>
          </a>
          <a href="/products/memories" className="hover:bg-white hover:rounded-md flex p-2">
            <Image src="/images/ram.png" width={24} height={24} alt="memories" />
            <span className="flex items-center pl-1">Memory</span>
          </a>
          <a href="/products/graphiccards" className="hover:bg-white hover:rounded-md flex p-2">
            <Image src="/images/graphic-card.png" width={24} height={24} alt="graphic cards"/>
            <span className="flex items-center pl-1">Graphic Cards</span>
          </a> 
          <a href="/products/powersupplies" className="hover:bg-white hover:rounded-md flex p-2">
            <Image src="/images/power-supply.png" width={24} height={24} alt="power supplies" />
            <span className="flex items-center pl-1">Power supply</span>
          </a>
          <a href="/products/computercases" className="hover:bg-white hover:rounded-md flex p-2">
            <Image src="/images/cases.png" width={24} height={24} alt="computer cases"/>
            <span className="flex items-center pl-1">Cases</span>
          </a>
          <a href="/products/displays" className="hover:bg-white hover:rounded-md flex p-2">
            <Image src="/images/monitor.png" width={24} height={24} alt="displays" />
            <span className="flex items-center pl-1">Displays</span>
          </a>                   
        </div>
      </div>
    )
  }
  
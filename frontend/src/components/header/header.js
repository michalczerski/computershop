import Basket from '@/components/header/basket/basket';
import Account from '@/components/header/account/account';
import Image from 'next/image'

export default function Header() {
  return (
      <div className="flex justify-between container mx-auto h-14 pl-4">
          <a className="flex align-middle" href="/">
              <Image className="m-auto" src="/logo.png" width={345} height={33}
                     priority={true} alt="computer shop"/>
          </a>
          <div className="flex flex-row h-full">
              <Account />
              <Basket />
          </div>
    </div>
  )
}

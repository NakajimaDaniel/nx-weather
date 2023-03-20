
import Image from 'next/image'
import logo from '../../public/assets/nxweather.png'

import { Noto_Sans } from 'next/font/google'
import SearchBar  from '../components/SearchBar'



export default function Home() {
  return (
    <main className={"bg-custom-purple-500 w-screen h-screen"} >
      <Image src={logo} alt=""/>
      <SearchBar />
    </main>
  )
}


import Image from 'next/image'
import logo from '../../public/assets/nxweather.png'

import { Noto_Sans } from 'next/font/google'
import SearchBar from '../components/SearchBar'



export default function Home() {
  return (
    <main className={"bg-custom-purple-500 w-screen h-screen"} >
      
      <div className={"flex flex-col justify-center items-center h-full"} >
      <Image className={"pb-5"} src={logo} alt=""/>
        <h4 className={"text-white pb-2"}>Start Searching: </h4>
        <SearchBar />
      </div>
      
    </main>
  )
}

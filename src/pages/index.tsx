
import Image from 'next/image'
import logo from '../../public/assets/nxweather.png'

import { Noto_Sans } from 'next/font/google'
import SearchBar from '../components/SearchBar'
import { useState } from 'react';
import { useRouter } from 'next/router';

type cityUnit = {
  country: string,
  id: number,
  name: string,
  _id: number
} 

export default function Home() {

  


  return (
    <main className={"bg-custom-purple-500 w-screen h-screen"} >
      
      <div className={"flex flex-col justify-center items-center h-full"} >
        <Image className={"pb-5"} src={logo} alt=""/>
        <h4 className={"text-white"}>Start Searching: </h4>
        <SearchBar />
      </div>
      
    </main>
  )
}


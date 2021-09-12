import React from "react";
import { SearchBar } from "../SearchBar";
import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <div className={styles.HeaderContainer}>
      <Link href="/">
        <div className={styles.HeaderImage}>
          <Image src="/assets/nx-weather-title.png"  width={160} height={26} />
        </div>
      </Link>
      <SearchBar />
    </div>
  )
}
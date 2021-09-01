import React from "react";
import { SearchBar } from "../SearchBar";
import styles from './styles.module.scss'


export function Header() {
  return (
    <div className={styles.HeaderContainer}>
      <img src="/assets/nx-weather-title.png"  />
      <SearchBar />
    </div>
  )
}
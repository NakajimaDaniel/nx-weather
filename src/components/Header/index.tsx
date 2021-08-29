import React from "react";
import { SearchBar } from "../SearchBar";
import styles from './styles.module.scss'


export function Header() {
  return (
    <div className={styles.HeaderContainer}>
      <span>NX-Weather</span>
      <SearchBar />
    </div>
  )
}
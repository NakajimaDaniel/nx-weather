import styles from './home.module.scss'

import axios from 'axios';
import { useEffect } from 'react';
import { GetStaticProps } from 'next';



export default function Home({ data }) {

  console.log(data)

  return (
    <div className={styles.mainContainer}>
      <span>NX-Weather</span>
      
    </div>
  )
}


export const getStaticProps: GetStaticProps = async() => {

  const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Diadema&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric `)
  const data = await res.data;

  return {
    props: {data}
  }

}
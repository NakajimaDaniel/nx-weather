import styles from './home.module.scss'

import axios from 'axios';
import { useEffect } from 'react';
import { GetStaticProps } from 'next';
import { SearchBar } from '../components/SearchBar';
import { WeatherCard } from '../components/WeatherCard';


export default function Home({ weatherData }) {


  return (
    <div className={styles.mainContainer}>
      <span>NX-Weather</span>
      <div className={styles.contentContainer}>
        <SearchBar />
        <WeatherCard city={weatherData.city} weatherInfo={weatherData.weatherInfo} />
      </div>
    </div>
  )
}


export const getStaticProps: GetStaticProps = async() => {

  const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Diadema&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric `)

  // const data = await res.data;

  const weatherData = {
    city: 'Diadema',
    weatherInfo: {
      description: res.data.weather.map(data=>{return data.description}).pop(),
      temperature: res.data.main.temp,
      minTemperature: res.data.main.temp_min,
      maxTemperature: res.data.main.temp_max,
      humidity: res.data.main.humidity,
    }
    

  } 



  return {
    props: {
      weatherData
    }
  }

}
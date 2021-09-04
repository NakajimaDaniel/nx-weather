import styles from './home.module.scss'

import axios from 'axios';
import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';

import { WeatherCard } from '../components/WeatherCard';
import { Header } from '../components/Header';


export default function Home({ weatherData }) {

  const UTCHour = new Date((weatherData[0].dt * 1000) + (weatherData[0].timezone * 1000)).getUTCHours();

  const [isNight, setIsNight] = useState(false)



  useEffect(() => {
    if(UTCHour >= 18 || UTCHour>= 0 && UTCHour <= 5) {
      setIsNight(true);
    } else {
      setIsNight(false);
    }
  }, [UTCHour])


  return (
    <div className={isNight?  styles.mainContainer : styles.mainContainerDay}>
      <Header /> 
        
      <div className={styles.contentContainer}>

        {weatherData.map(data => {
          return(
          <WeatherCard weatherInfo={data} isNight={isNight} key={data.name} />
        )})}
      
      </div>


    </div>
  )
}


export const getStaticProps: GetStaticProps = async() => {


  const res = await axios.get(`http://api.openweathermap.org/data/2.5/find?lat=-23.550520&lon=-46.633308&cnt=6&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`)

  const data = res.data;

  const weatherData = data.list.map(data => {
    return{
      city: data.name,
      description: data.weather.map(data=>{return data.description}).pop(),
      temperature: data.main.temp,
      minTemperature: data.main.temp_min,
      maxTemperature: data.main.temp_max,
      humidity: data.main.humidity,
      dt: data.dt,
      icon: data.weather.map(data => {return data.icon}).pop(),
      country: data.sys.country,
      timezone: -10800,
    }
  });


  return {
    props: {
      weatherData
    }
  }
}

import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { SearchBar } from '../../components/SearchBar';
import { WeatherCard } from '../../components/WeatherCard';
import styles from './cityWeather.module.scss';


	

import React, { createElement, useEffect, useState } from 'react';
import { autocomplete,getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch';




	




const apiid = '602BIBAIH0';
const apikeyd = '47f26875cbaa4eaaef4a0f989fbc93ef'

const searchClient = algoliasearch(apiid, apikeyd);



interface cityWeatherProps {
  weatherDataCurrent: {
    city: string,
    description: string,
    temperature: number,
    minTemperature: number,
    maxTemperature: number,
    humidity: number,
    dt: number,
    timezone: number,
    icon: string,
    country: string,
  },

  weatherForecastData: Array<weatherForecastUnit>
  
}

interface weatherForecastUnit { 
  dt: number,
  clouds: number,
  humidity: number,
  pressure: number,
  tempDay: number,
  tempMin: number,
  tempMax: number,
  weatherMain: string,
  weatherDescription: string,
  icon: string,
  windSpeed: number,
  windGust: number,
  windDeg: number,
  PrecipitationProp: number,
}

export default function CityWeather({weatherForecastData,weatherDataCurrent }:cityWeatherProps) {

  const router = useRouter();

  const UTCHour = new Date((weatherDataCurrent.dt * 1000) + (weatherDataCurrent.timezone * 1000)).getUTCHours();

  const [isNight, setIsNight] = useState(false)



  useEffect(() => {
    if(UTCHour >= 18 || UTCHour>= 0 && UTCHour <= 5) {
      setIsNight(true);
    } else {
      setIsNight(false);
    }
  }, [UTCHour])


  if(router.isFallback) {
    return (
      <div>Loading...</div>
    )
  }



  return (
    <div className={isNight?  styles.cityWeatherContainer : styles.cityWeatherContainerDay}>
      	
      <SearchBar /> 
      <WeatherCard  weatherInfo={weatherDataCurrent} isNight={isNight} />

      <div className={styles.tomorrowWeather}>
        <div>
          <span>Weather for tomorrow</span>
          <h1>{weatherForecastData[0].tempDay}ºC</h1>
        </div>

        <div className={styles.tomorrowWeatherDataWrapper}>
          <div className={styles.tomorrowWeatherData}>
            <div>
              <span><i className="wi wi-thermometer"></i> {weatherForecastData[0].tempMin}/{weatherForecastData[0].tempMax}°C</span>
            </div>
            <div>
              <span><i className="wi wi-barometer"></i> {weatherForecastData[0].pressure} hPa</span>
            </div>
            <div>
              <span><i className="wi wi-humidity"></i> {weatherForecastData[0].humidity}%</span>
            </div>
          </div>

          <div className={styles.tomorrowWeatherData}>
            <div>
              <span><i className="wi wi-windy"></i> {weatherForecastData[0].windSpeed} metre/sec</span>
            </div>
            <div>
              <span><i className="wi wi-dust"></i> {weatherForecastData[0].windGust} metre/sec</span>
            </div>
            <div>
              <span>{weatherForecastData[0].windDeg}º</span>
            </div>
          </div>

          <div className={styles.tomorrowWeatherData}>
            <div>
              <span><i className="wi wi-raindrops"></i> {weatherForecastData[0].PrecipitationProp} %</span>
            </div>
          </div>

        </div>
      </div>

      <div className={styles.forecastContainer}>
        <p>Forecast for the next 5 days</p>

        <div className={styles.forecastWrapper}>


          {weatherForecastData.slice(0,5).map(data=> {
            return (
            <div className={styles.forecastUnit}>
              <p>{new Date(data.dt * 1000).toLocaleString('pt-br', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
              })}</p>
              <img src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`} /> 
              <span>{data.tempDay}°C</span>
              <span>{data.tempMin}/{data.tempMax}°C</span>
            </div>
            )
          })}  


        </div>

      </div>


    </div>
  )
}


export const getServerSideProps = async ({params}) => {

  const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${params.id}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric `);
  const data = await res.data;

  const lat = res.data.coord.lat;
  const lon = res.data.coord.lon;


  const weatherDataCurrent = {
    city: res.data.name,
    description: res.data.weather.map(data=>{return data.description}).pop(),
    temperature: res.data.main.temp,
    minTemperature: res.data.main.temp_min,
    maxTemperature: res.data.main.temp_max,
    humidity: res.data.main.humidity,
    dt: res.data.dt,
    timezone: res.data.timezone,
    icon: res.data.weather.map(data => {return data.icon}).pop(),
    country: res.data.sys.country,
  }

  const res2 = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric `)
  const data2 = res2.data;


  const weatherForecastData = 

    res2.data.daily.map(data => {
      return {
        dt: data.dt,
        clouds: data.clouds,
        humidity: data.humidity,
        pressure: data.pressure,
        tempDay: data.temp.day,
        tempMin: data.temp.min,
        tempMax: data.temp.max,
        weatherMain: data.weather[0].main,
        weatherDescription: data.weather[0].description,
        icon: data.weather[0].icon,

        windSpeed: data.wind_speed,
        windGust: data.wind_gust,
        windDeg: data.wind_deg,
        PrecipitationProp: data.pop,
        // PrecipitationVol: data.rain,
        
      }
    })

  

  return {
    props: {
      weatherForecastData,
      weatherDataCurrent
    }
  }

}
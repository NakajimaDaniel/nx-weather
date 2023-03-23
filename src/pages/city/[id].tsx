
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import styles from './cityWeather.module.scss';
import React, { createElement, useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image'
import { Icon } from '@iconify/react';
import Cloud from '../../../public/assets/cloud.png'
import Sun from '../../../public/assets/sun.png'
import SunCloud from '../../../public/assets/cloud-sun.png'
import Rain from '../../../public/assets/rain.png'
import Thunder from '../../../public/assets/thunder.png'
import Mist from '../../../public/assets/mist.png'

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
    windSpeed:number,
    weatherStatus: string,
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


interface weatherTypes {
  name: string,
  icon: StaticImageData
}


export default function CityWeather({weatherForecastData,weatherDataCurrent }: cityWeatherProps) {
 
 
  const weatherTypes:weatherTypes[] = [
    {
      name: "clear sky",
      icon: Sun
    },
    {
      name: "few clouds",
      icon: SunCloud,
    },
    {
      name: "scattered clouds",
      icon: Cloud,
    },
    {
      name: "broken clouds",
      icon: Cloud,
    },
    {
      name: "shower rain",
      icon: Rain,
    },
    {
      name: "rain",
      icon: Rain,
    },
    {
      name: "light rain",
      icon: Rain,
    },
    {
      name: "moderate rain",
      icon: Rain,
    },
    {

      name: "thunderstorm",
      icon: Thunder,
    },
    {
      name: "snow",
      icon: Mist,
    },
    {
      name: "mist",
      icon: Mist,
    },
  ]

  const currentWeatherIcon = weatherTypes.filter(data => {
    if (data.name == weatherDataCurrent.description) {
      return data
    }
  }).map(data => {return data.icon}).pop()


  return (
    <main>
      
      <div className={"flex flex-col items-center h-full"} >
        <div className={"flex flex-row  pb-2 pt-6"}>
          <Icon icon="mdi:map-marker" className={"text-custom-purple-400 pt-1"} width="24px" />
          <h4 className={"text-white font-bold text-2xl"}>{weatherDataCurrent.city}, {weatherDataCurrent.country}</h4>
        </div>
        <Image src={currentWeatherIcon} alt="" />
        <div className={"flex flex-row pb-2"}>
          <div className={"text-white font-bold text-3xl"}>{Math.round(weatherDataCurrent.temperature * 10) / 10}ºC</div>
        </div>
        <div className={"flex flex-row pb-2"}>
          <div className={"text-white font-bold text-lg"}>{weatherDataCurrent.description}</div>
        </div>
        <div className={"flex flex-row gap-10 pb-4"}>
          <div className={"text-white font-bold text-sm"}>Max: {Math.round(weatherDataCurrent.maxTemperature)}ºC</div>
          <div className={"text-white font-bold text-sm"}>Min: {Math.round(weatherDataCurrent.minTemperature)}ºC</div>
        </div>
        <div className={"flex flex-row sm:gap-10 gap-2 pb-10"}>
          <div className={"flex flex-row items-center gap-2 bg-custom-purple-450/40 pt-1 pb-1 pl-3 pr-3 rounded "}>
            <Icon icon="fluent:weather-drizzle-20-filled" className={"text-white/70"} width="27px" />
            <div className={"text-white/70 font-bold text-sm"}>30%</div>
          </div>

          <div className={"flex flex-row items-center gap-2 bg-custom-purple-450/40 pt-1 pb-1 pl-3 pr-3 rounded "}>
            <Icon icon="uil:raindrops" className={"text-white/70"} width="20px" />
            <div className={"text-white/70 font-bold text-sm"}>{weatherDataCurrent.humidity}%</div>
          </div>

          <div className={"flex flex-row items-center gap-2 bg-custom-purple-450/40 pt-1 pb-1 pl-3 pr-3 rounded "}>
            <Icon icon="fluent:weather-duststorm-20-filled" className={"text-white/70"} width="20px" />
            <div className={"text-white/70 font-bold text-sm"}>{Math.round(weatherDataCurrent.windSpeed)}m/s</div>
          </div>
        </div>

        <div className={"flex flex-col bg-custom-purple-450/40 p-5 rounded-xl md:w-2/5 mb-10"}>
          <h2 className={"text-white/70 font-bold text-2xl pb-5"}>Weather for tommorow</h2>
          <h2 className={"text-white/70 font-bold text-2xl pb-10"}>{Math.round(weatherForecastData[0].tempDay * 10) / 10}ºC</h2>
          <div className={"flex flex-row gap-10"}>
            <div className={"flex flex-row items-center gap-2"}>
              <Icon icon="fluent:weather-drizzle-20-filled" className={"text-white/70"} width="27px" />
              <div className={"text-white/70 font-bold text-sm"}>{Math.round(weatherForecastData[0].PrecipitationProp * 10) / 10}%</div>
            </div>

            <div className={"flex flex-row items-center gap-2"}>
              <Icon icon="uil:raindrops" className={"text-white/70"} width="20px" />
              <div className={"text-white/70 font-bold text-sm"}> {Math.round(weatherForecastData[0].humidity * 10) / 10}%</div>
            </div>

            <div className={"flex flex-row items-center gap-2"}>
              <Icon icon="fluent:weather-duststorm-20-filled" className={"text-white/70"} width="20px" />
              <div className={"text-white/70 font-bold text-sm"}>{Math.round(weatherForecastData[0].windSpeed * 10) / 10}m/s</div>
            </div>
          </div>
        </div>

        <div className={"relative flex flex-row bg-custom-purple-450/40 p-5 rounded-xl lg:w-2/5 md:w-3/5  sm:w-9/12 mr-10 ml-10 overflow-auto"}>

        
          {weatherForecastData.slice(1,6).map(data => {
            return(
            <div className={"flex flex-col items-center ml-5"} key={data.dt}>

              <h3 className={"text-white/70 font-bold text-sm"}>{new Date(data.dt * 1000).toLocaleString('en', {weekday: 'long'})}</h3>
              <Image src={
                weatherTypes.filter(weatherData => {
                  if (weatherData.name == data.weatherDescription) {
                    return data
                  }
                  }).map(data => {return data.icon}).pop()

              } alt=""/>
      
              <h4 className={"text-white/70 font-bold text-sm"}>{Math.round(data.tempDay)}ºC</h4>
              <div className={"flex flex-row gap-3"}>
                <h5 className={"text-white/70 font-bold text-sm"}>{Math.round(data.tempMax)}ºC</h5>
                <h5 className={"text-white/70 font-bold text-sm"}>{Math.round(data.tempMin)}ºC</h5>
              </div>

            </div>
            )
          })}

        </div>

      </div>
      
    </main>
  )
}



export const getServerSideProps = async ({params}) => {

  const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${params.id}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric `);

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
    windSpeed:res.data.wind.speed,
    weatherStatus: res.data.weather.map(data => {return data.main}).pop(),

  }

  const res2 = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric `)

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
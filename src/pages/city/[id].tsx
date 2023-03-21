
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import styles from './cityWeather.module.scss';
import React, { createElement, useEffect, useState } from 'react';
import Image from 'next/image'
import { Icon } from '@iconify/react';
import Cloud  from '../../../public/assets/cloud.png'

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

export default function CityWeather({weatherForecastData,weatherDataCurrent }: cityWeatherProps) {
  /*
  const router = useRouter();

  const UTCHour = new Date((weatherDataCurrent.dt * 1000) + (weatherDataCurrent.timezone * 1000)).getUTCHours();

  const [isNight, setIsNight] = useState(false);


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
      	
      <Header /> 
      <WeatherCard  weatherInfo={weatherDataCurrent} isNight={isNight} />

      <div className={styles.tomorrowWeather}>
        <div>
          <span>Weather for tomorrow</span>
          <h1>{Math.round(weatherForecastData[0].tempDay * 10) / 10}ºC</h1>
        </div>

        <div className={styles.tomorrowWeatherDataWrapper}>
          <div className={styles.tomorrowWeatherData}>
            <div>
              <span><i className="wi wi-thermometer"></i> {Math.round(weatherForecastData[0].tempMin * 10) / 10}/{Math.round(weatherForecastData[0].tempMax * 10) / 10}°C</span>
            </div>
            <div>
              <span><i className="wi wi-barometer"></i> {Math.round(weatherForecastData[0].pressure * 10) / 10} hPa</span>
            </div>
            <div>
              <span><i className="wi wi-humidity"></i> {Math.round(weatherForecastData[0].humidity * 10) / 10}%</span>
            </div>

            <div>
              <span><i className="wi wi-windy"></i> {Math.round(weatherForecastData[0].windSpeed * 10) / 10} metre/sec</span>
            </div>
            <div>
              <span><i className="wi wi-dust"></i> {Math.round(weatherForecastData[0].windGust * 10) / 10} metre/sec</span>
            </div>
            <div>
              <span>{weatherForecastData[0].windDeg}º</span>
            </div>

            <div>
              <span><i className="wi wi-raindrops"></i> {Math.round(weatherForecastData[0].PrecipitationProp * 10) / 10} %</span>
            </div>

          </div>


        </div>
      </div>

      <div className={styles.forecastContainer}>
        <p>Forecast for the next 5 days</p>

        <div className={styles.forecastWrapper}>


          {weatherForecastData.slice(0,5).map(data=> {
            return (
            <div className={styles.forecastUnit} key={data.dt} >
              <p>{new Date(data.dt * 1000).toLocaleString('en', {weekday: 'long'})}</p>
              <p>{new Date(data.dt * 1000).toLocaleString('default', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
              })}</p>
              <Image src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}  width={100} height={100} /> 
              <span>{data.tempDay}°C</span>
              <span>{data.tempMin}/{data.tempMax}°C</span>
            </div>
            )
          })}  


        </div>

      </div>


    </div>
  )
  */

  console.log(weatherForecastData )

  return (
    <main>
      
      <div className={"flex flex-col items-center h-full"} >
        <div className={"flex flex-row  pb-2 pt-6"}>
          <Icon icon="mdi:map-marker" className={"text-custom-purple-400 pt-1"} width="24px" />
          <h4 className={"text-white font-bold text-2xl"}>Sao Paulo, BR</h4>
        </div>
        <Image src={Cloud} alt="" />
        <div className={"flex flex-row pb-2"}>
          <div className={"text-white font-bold text-3xl"}>28.2ºC</div>
        </div>
        <div className={"flex flex-row pb-2"}>
          <div className={"text-white font-bold text-lg"}>Few clouds</div>
        </div>
        <div className={"flex flex-row gap-10 pb-4"}>
          <div className={"text-white font-bold text-sm"}>Max: 30ºC</div>
          <div className={"text-white font-bold text-sm"}>Min: 26ºC</div>
        </div>
        <div className={"flex flex-row sm:gap-10 gap-2 pb-10"}>
          <div className={"flex flex-row items-center gap-2 bg-custom-purple-450/40 pt-1 pb-1 pl-3 pr-3 rounded "}>
            <Icon icon="fluent:weather-drizzle-20-filled" className={"text-white/70"} width="27px" />
            <div className={"text-white/70 font-bold text-sm"}>30%</div>
          </div>

          <div className={"flex flex-row items-center gap-2 bg-custom-purple-450/40 pt-1 pb-1 pl-3 pr-3 rounded "}>
            <Icon icon="uil:raindrops" className={"text-white/70"} width="20px" />
            <div className={"text-white/70 font-bold text-sm"}>30%</div>
          </div>

          <div className={"flex flex-row items-center gap-2 bg-custom-purple-450/40 pt-1 pb-1 pl-3 pr-3 rounded "}>
            <Icon icon="fluent:weather-duststorm-20-filled" className={"text-white/70"} width="20px" />
            <div className={"text-white/70 font-bold text-sm"}>3km/h</div>
          </div>
        </div>

        <div className={"flex flex-col bg-custom-purple-450/40 p-5 rounded-xl md:w-2/5 mb-10"}>
          <h2 className={"text-white/70 font-bold text-2xl pb-5"}>Weather for tommorow</h2>
          <h2 className={"text-white/70 font-bold text-2xl pb-10"}>27.2ºC</h2>
          <div className={"flex flex-row gap-10"}>
            <div className={"flex flex-row items-center gap-2"}>
              <Icon icon="fluent:weather-drizzle-20-filled" className={"text-white/70"} width="27px" />
              <div className={"text-white/70 font-bold text-sm"}>30%</div>
            </div>

            <div className={"flex flex-row items-center gap-2"}>
              <Icon icon="uil:raindrops" className={"text-white/70"} width="20px" />
              <div className={"text-white/70 font-bold text-sm"}>30%</div>
            </div>

            <div className={"flex flex-row items-center gap-2"}>
              <Icon icon="fluent:weather-duststorm-20-filled" className={"text-white/70"} width="20px" />
              <div className={"text-white/70 font-bold text-sm"}>3km/h</div>
            </div>
          </div>
        </div>

        <div className={"flex flex-row bg-custom-purple-450/40 p-5 rounded-xl md:w-2/5"}>
          <div className={"flex flex-col items-center"}>
            <h3 className={"text-white/70 font-bold text-sm"}>Tommorow</h3>
            <h4 className={"text-white/70 font-bold text-sm"}>28.3ºC</h4>
            <div className={"flex flex-row gap-3"}>
              <h5 className={"text-white/70 font-bold text-sm"}>30.4ºC</h5>
              <h5 className={"text-white/70 font-bold text-sm"}>27.4ºC</h5>
            </div>
          </div>
        </div>


      </div>
      
    </main>
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
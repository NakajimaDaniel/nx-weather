
import styles from './styles.module.scss'
import Image from 'next/image'

type WeatherCardProps = {

  weatherInfo: {
    city: string,
    description: string,
    temperature: number,
    minTemperature: number,
    maxTemperature: number,
    humidity: number,
    icon: string,
    country: string,
    dt: number,
    timezone: number,
  },
  isNight: boolean,

}


export function WeatherCard({weatherInfo, isNight}: WeatherCardProps) {

  const weatherDate = new Date((weatherInfo.dt * 1000) + (weatherInfo.timezone * 1000)).toUTCString();



  return (
    <div className={isNight?  styles.cardContainer : styles.cardContainerDay}>
      <div className={styles.cardContent}>
        <div className={styles.cardContentMainInfo}>
          <span>Current weather in {weatherInfo.city}, {weatherInfo.country} </span>
          <h2>{Math.round(weatherInfo.temperature * 10)/10}ºC</h2>
          <p>{weatherInfo.description}</p>
          <h3>Updated at {weatherDate}</h3>
        </div>

        <div className={styles.cardContentSideInfo}>
          <Image src={`http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`} width={100} height={100} />
          <span>{Math.round(weatherInfo.minTemperature * 10) / 10}/{Math.round(weatherInfo.maxTemperature * 10) / 10 }ºC</span>
        </div>
      </div>
    </div>
  )
}
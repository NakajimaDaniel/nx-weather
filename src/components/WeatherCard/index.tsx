
import styles from './styles.module.scss'

type WeatherCardProps = {

  weatherInfo: {
    city: string,
    description: string,
    temperature: number,
    minTemperature: number,
    maxTemperature: number,
    humidity: number,
  }

}


export function WeatherCard({weatherInfo}: WeatherCardProps) {

  console.log(weatherInfo)

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContent}>
        <div className={styles.cardContentMainInfo}>
          <span>{weatherInfo.city}</span>
          <h2>{weatherInfo.temperature}ºC</h2>
          <p>{weatherInfo.description}</p>
        </div>

        <div className={styles.cardContentSideInfo}>
          <img src="/images/nights.svg" alt="moon" />
          <span>{weatherInfo.minTemperature}/{weatherInfo.maxTemperature}ºC</span>
        </div>
      </div>
    </div>
  )
}
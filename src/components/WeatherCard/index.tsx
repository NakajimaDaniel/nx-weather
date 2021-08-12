
import styles from './styles.module.scss'

type WeatherCardProps = {
  city: string,
  weatherInfo: {
    description: string,
    temperature: number,
    minTemperature: number,
    maxTemperature: number,
    humidity: number,
  }
}


export function WeatherCard({weatherInfo}: WeatherCardProps) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContent}>
        <div className={styles.cardContentMainInfo}>
          <span>Diadema</span>
          <h2>24ºC</h2>
          <p>Clear Sky</p>
        </div>

        <div className={styles.cardContentSideInfo}>
          <img src="/images/nights.svg" alt="moon" />
          <span>15/25ºC</span>
        </div>
      </div>
    </div>
  )
}
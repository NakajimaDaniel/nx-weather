
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { WeatherCard } from '../../components/WeatherCard';
import styles from './cityWeather.module.scss';




export default function CityWeather({weatherData}) {

  const router = useRouter();


  if(router.isFallback) {
    return (
      <div>Loading...</div>
    )
  }


  return (
    <div className={styles.cityWeatherContainer}>
      <WeatherCard weatherInfo={weatherData} />
    </div>
  )
}


export const getServerSideProps = async ({params}) => {

  const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${params.id}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric `);
  const data = await res.data;

  const weatherData = {
    city: res.data.name,
    description: res.data.weather.map(data=>{return data.description}).pop(),
    temperature: res.data.main.temp,
    minTemperature: res.data.main.temp_min,
    maxTemperature: res.data.main.temp_max,
    humidity: res.data.main.humidity,
    
  }

  return {
    props: {
      weatherData
    }
  }

}
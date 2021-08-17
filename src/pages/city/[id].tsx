
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { SearchBar } from '../../components/SearchBar';
import { WeatherCard } from '../../components/WeatherCard';
import styles from './cityWeather.module.scss';



interface cityWeatherProps {
  weatherData: {
    city: string,
    description: string,
    temperature: number,
    minTemperature: number,
    maxTemperature: number,
    humidity: number,
  },

  weatherForecastData: {
    city: {
      name: string,
      country: string,
    },
    list: Array<weatherForecastUnit>
  }
}

interface weatherForecastUnit { 
  dt: number,
  dt_txt: string,
  weather: {
    temp: number,
    feelsLike: number,
    minTemp: number,
    maxTemp: number,
    pressure: number,
    humidity: number,
    status: string,
    description: string,
    icon: string,
  }
}

export default function CityWeather({weatherData, weatherForecastData}: cityWeatherProps) {

  const router = useRouter();


  if(router.isFallback) {
    return (
      <div>Loading...</div>
    )
  }

  console.log(weatherForecastData)
  console.log(weatherData)

  return (
    <div className={styles.cityWeatherContainer}>
      <SearchBar />
      <WeatherCard weatherInfo={weatherData} />

      <div className={styles.tomorrowWeather}>
        <div>
          <span>Weather for tomorrow</span>
          <h1>{weatherForecastData?.list[0][0].weather?.temp}ºC</h1>
        </div>

        <div className={styles.tomorrowWeatherData}>
          <div>
            <span>{weatherForecastData?.list[0][0].weather.minTemp}/{weatherForecastData?.list[0][0].weather.maxTemp}°C</span>
          </div>
          <div>
            <span>{weatherForecastData?.list[0][0].weather.pressure}hPa</span>
          </div>
          <div>
            <span>{weatherForecastData?.list[0][0].weather.humidity}%</span>
          </div>
        </div>
      </div>
      
    </div>
  )
}


export const getServerSideProps = async ({params}) => {


  const res = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=${params.id}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric `);
  const data = await res.data;

  const res2 = await axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${params.id}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric `);
  const data2 = await res2.data;


  const weatherForecastData = {
    city: {
      name: res.data.city.name,
      country: res.data.city.country,
    },
    list: [ res.data.list.map(data => {
      return {
        dt: data.dt,
        dt_txt: data.dt_txt,
        weather: {
          temp: data.main.temp,
          feelsLike: data.main.feels_like,
          minTemp: data.main.temp_min,
          maxTemp: data.main.temp_max,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
          status: data.weather[0].main,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        }
      }
    })]

  }

  const weatherData = {
    city: res2.data.name,
    description: res2.data.weather.map(data=>{return data.description}).pop(),
    temperature: res2.data.main.temp,
    minTemperature: res2.data.main.temp_min,
    maxTemperature: res2.data.main.temp_max,
    humidity: res2.data.main.humidity,
    
  }

  return {
    props: {
      weatherData,
      weatherForecastData
    }
  }

}
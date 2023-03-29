
import { render, screen } from "@testing-library/react"
import CityWeather from "../../pages/city/[id]"
import { useRouter } from 'next/dist/client/router';
import { mocked } from 'jest-mock';
import '@testing-library/jest-dom'

const weatherData = { 
  city: "Diadema",
  description: "mist",
  temperature: 29,
  minTemperature: 21,
  maxTemperature: 30,
  humidity: 11,
  dt: 1631139240,
  icon: "01d",
  country: "BR",
  timezone: -10800,
  windSpeed: 10,
  weatherStatus: "status",
}

const weatherForecastUnit = { 
  dt: 1631139240,
  clouds: 10,
  humidity: 10,
  pressure: 10,
  tempDay: 20.55,
  tempMin: 15,
  tempMax: 25,
  weatherMain: "cloud",
  weatherDescription: "mist",
  icon: "01d",
  windSpeed: 20,
  windGust: 10,
  windDeg: 100,
  PrecipitationProp: 151,
}



jest.mock('next/router', () => require('next-router-mock'));
jest.mock('../../../public/assets/cloud.png');
jest.mock('../../../public/assets/mist.png');
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}))

describe("city weather page unit test", () => {


  it("should render city name correctly", () => {

    render(<CityWeather weatherDataCurrent={weatherData} weatherForecastData={[weatherForecastUnit]}   /> )

    expect(screen.getByText("Diadema, BR")).toBeInTheDocument();


  })


  it("should show rounded temperature value", () => {

    render(<CityWeather weatherDataCurrent={weatherData} weatherForecastData={[weatherForecastUnit]}   /> )

    expect(screen.getByText("20.6ºC")).toBeInTheDocument();
  })


})
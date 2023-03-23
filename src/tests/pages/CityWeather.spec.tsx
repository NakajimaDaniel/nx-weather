/*
import { render, screen } from "@testing-library/react"
import CityWeather from "../../pages/city/[id]"
import { useRouter } from 'next/dist/client/router';
import { mocked } from 'ts-jest/utils';

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

jest.mock('next/dist/client/router');


describe("city weather page unit test", () => {


  it("should render city name correctly", () => {

    const useRouterMocked = mocked(useRouter);

    useRouterMocked.mockImplementation(() => ({
      isFallback: false
    })as any)

    render(<CityWeather weatherDataCurrent={weatherData} weatherForecastData={[weatherForecastUnit]}   /> )

    expect(screen.getByText("Current weather in Diadema, BR")).toBeInTheDocument();


  })


  it("show today date", () => {

    const useRouterMocked = mocked(useRouter);

    useRouterMocked.mockImplementation(() => ({
      isFallback: false
    })as any)

    render(<CityWeather weatherDataCurrent={weatherData} weatherForecastData={[weatherForecastUnit]}   /> )

    expect(screen.getByText("09/08/21")).toBeInTheDocument();

  })


  it("should show rounded temperature value", () => {
    const useRouterMocked = mocked(useRouter);

    useRouterMocked.mockImplementation(() => ({
      isFallback: false
    })as any)

    render(<CityWeather weatherDataCurrent={weatherData} weatherForecastData={[weatherForecastUnit]}   /> )

    expect(screen.getByText("20.6ºC")).toBeInTheDocument();
  })


})*/
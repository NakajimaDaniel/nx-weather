import { render, screen } from "@testing-library/react"
import { WeatherCard } from "."



const weatherInfo = {
  city: "Diadema",
  description: "mist",
  temperature: 20,
  minTemperature: 19,
  maxTemperature: 21,
  humidity: 21,
  dt: 111111,
  icon: "01d",
  country: "BR",
  timezone: -10800,
}


describe("weather card unit test", () => {

  it("render correctly", () => {

    render(
      <WeatherCard  weatherInfo={weatherInfo} isNight={false} /> 
    )

    expect(screen.getByText("Current weather in Diadema, BR")).toBeInTheDocument();

  })


})
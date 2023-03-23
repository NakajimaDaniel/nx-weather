
/*
import { render, screen } from "@testing-library/react"
import Home from "../../pages"


const weatherData = { 
  city: "diadema",
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



describe("home page test", () => {


  it("renders weather description correctly", () => {

    render(<Home weatherData={[weatherData]}  /> )

    expect(screen.getByText("mist")).toBeInTheDocument();

  })


  it("should render date and time correctly", () => {

    render(<Home weatherData={[weatherData]}  /> )

    expect(screen.getByText("Updated at Wed, 08 Sep 2021 19:14:00 GMT")).toBeInTheDocument();

  })



}) */
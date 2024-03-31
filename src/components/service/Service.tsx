import axios from "axios";

const APIkey = "db8dc225fd126beff84b1ca33ac0b059";

export const fetchWeatherData = async (location: string) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

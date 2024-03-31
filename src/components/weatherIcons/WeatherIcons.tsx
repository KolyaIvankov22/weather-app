import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
} from "react-icons/io";
import { BsCloudHaze2Fill, BsCloudDrizzleFill } from "react-icons/bs";
import { WeatherIconProps } from "../interface/Interface";

const WeatherIcon: React.FC<WeatherIconProps> = ({ weatherMain }) => {
  let icon = null;

  switch (weatherMain) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-[#31cafb]" />;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-[#31cafb]" />;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-[#31cafb]" />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
    default:
      break;
  }

  return <div>{icon}</div>;
};

export default WeatherIcon;

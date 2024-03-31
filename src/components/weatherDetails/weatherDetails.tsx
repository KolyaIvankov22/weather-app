import { BsThermometer, BsEye, BsWater, BsWind } from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import { WeatherDetailsProps } from "../interface/Interface";

export default function WeatherDetails({ data }: WeatherDetailsProps) {
  return (
    <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <div className="text-[20px]">
            <BsThermometer />
          </div>
          <div className="flex">
            Feels like
            <div className="flex ml-2">
              {parseInt(data.main.feels_like?.toString() || "0")}
              <TbTemperatureCelsius />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="text-[20px]">
            <BsEye />
          </div>
          <div>
            Visibility
            <span className="ml-2">
              {data.visibility ? data.visibility / 1000 : "N/A"} km
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <div className="text-[20px]">
            <BsWater />
          </div>
          <div className="flex">
            Humidity
            <div className="flex ml-2">{data.main.humidity}%</div>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="text-[20px]">
            <BsWind />
          </div>
          <div>
            Wind <span className="ml-2">{data.wind.speed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
}

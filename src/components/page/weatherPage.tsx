import { useEffect, useState, useMemo } from "react";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";
import { fetchWeatherData } from "../service/Service";
import { WeatherState } from "../interface/Interface";
import WeatherIcon from "../weatherIcons/WeatherIcons";
import WeatherDetails from "../weatherDetails/weatherDetails";
import WeatherSearchForm from "../weatherSearchForm/WeatherSearchForm";

export default function WeatherPage() {
  const [location, setLocation] = useState<string>("Oslo");
  const [data, setData] = useState<WeatherState | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [animate, setAnimate] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | { message: string }>("");

  const date = useMemo(() => new Date(), []);

  useEffect(() => {
    const fetchData = async () => {
      if (location) {
        setLoading(true);
        try {
          const weatherData = await fetchWeatherData(location);
          if (weatherData.cod === "404") {
            setErrorMsg("City not found");
          } else {
            setData(weatherData);
          }
        } catch (error) {
          setErrorMsg("Failed to fetch weather data");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (inputValue.trim() !== "") {
      setLocation(inputValue.trim());
    } else {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }
    setInputValue("");
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen px-4 bg-center bg-no-repeat bg-cover bg-bgColor lg:px-0">
      {errorMsg && (
        <div className="text-red-500">
          {typeof errorMsg === "string" ? errorMsg : errorMsg.message}
        </div>
      )}
      <WeatherSearchForm
        animate={animate}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        inputValue={inputValue}
      />
      <div className="w-full text-white bg-formBgColor max-w-[450px] min-h-[580px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        {!loading && data && (
          <>
            <div className="flex items-center justify-center gap-x-5">
              <div className="flex items-center gap-4">
                <div className="text-[87px]">
                  <WeatherIcon weatherMain={data?.weather[0]?.main} />
                </div>
                <div className="text-2xl font-semibold">
                  {data.name}, {data.sys.country}
                </div>
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </div>
              </div>
            </div>
            <div className="my-20">
              <div className="flex items-center justify-center">
                <div className="text-[144px] leading-none font-light">
                  {parseInt(data.main.temp?.toString() || "0")}
                </div>
                <div className="text-4xl">
                  <TbTemperatureCelsius />
                </div>
              </div>
              <div className="text-center capitalize">
                {data.weather[0].description}
              </div>
            </div>
            {data && <WeatherDetails data={data} />}
          </>
        )}
        {loading && (
          <div className="flex items-center justify-center w-full h-full">
            <ImSpinner8 className="text-5xl text-white animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}

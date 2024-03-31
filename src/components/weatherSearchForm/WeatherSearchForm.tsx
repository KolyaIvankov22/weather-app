import { IoMdSearch } from "react-icons/io";
import { WeatherSearchFormProps } from "../interface/Interface";

export default function WeatherSearchForm({
  animate,
  handleInput,
  handleSubmit,
  inputValue,
}: WeatherSearchFormProps) {
  return (
    <form
      onClick={(e) => handleSubmit(e)}
      action=""
      className={`${
        animate ? "animate-shake" : "animate-none"
      } h-16 bg-formColor w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}
    >
      <div className="relative flex items-center justify-between h-full p-2">
        <input
          onChange={(e) => handleInput(e)}
          className="flex-1 bg-transparent outline-none placeholder-text-white text-white text-[15px] font-light pl-6 h-full"
          type="text"
          placeholder="Search by city or country"
          value={inputValue}
        />
        <button
          type="submit"
          className="flex items-center justify-center w-20 h-12 transition rounded-full bg-bgColor hover:bg-formBgColor"
        >
          <IoMdSearch className="text-2xl text-white" />
        </button>
      </div>
    </form>
  );
}

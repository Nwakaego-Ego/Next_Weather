"use client";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { debounce } from "@/utility/utility";

const hero = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=bea8e5cfc09f2c80726c878f5fd81290`;

  const searchLocation = () => {
    axios.get(url).then((response) => {
      // Handle the response data
      console.log(response.data);
      setData(response.data);
    });
  };

  const debouncedFunction = debounce(searchLocation, 1000);

  return (
    <div className=" container  px-8">
      <div className="flex items-center justify-center mt-6">
        <input
          type="text"
          placeholder="Enter Country"
          className="placeholder:text-red-500 placeholder:p-2 h-12 rounded-xl bg-red-200 lg:w-96"
          onChange={(event) => {
            setLocation(event.target.value);
            debouncedFunction();
          }}
        />
      </div>
      <p className="text-xl mt-20 text-red-600">{data?.name ?? `Lagos`}</p>
      <div className="flex justify-between ">
        <div>
          <p className="lg:text-6xl text-4xl text-red-600 ">
            {Math.round(data?.main?.temp ?? `25`)}°F
          </p>
        </div>

        <div>
          <Image
            src="/weather.svg"
            alt="weather"
            width="400"
            height="100"
            className=" lg:w-96 w-52"
          />
        </div>
        <div>
          <p className="transform rotate-90 text-red-600 text-xl ">
            {data?.weather?.[0]?.main ?? `Clouds`}
          </p>
        </div>
      </div>
      <div className="flex lg:mt-28 mt-48 p-8 justify-between bg-red-200 text-red-600 rounded-xl">
        <div className="">
          <p className=" flex items-center justify-center">
            {Math.round(data?.main?.feels_like ?? `100`)}°F
          </p>
          <p>Feels like</p>
        </div>
        <div>
          <p className="flex items-center justify-center">
            {data?.main?.humidity !== undefined
              ? data?.main?.humidity + `%`
              : `20%`}
          </p>
          <p>Humidity</p>
        </div>
        <div>
          <p className="flex items-center justify-center">
            {/* {data?.main?.temp ?? `2MP`} */}
            {data?.wind?.speed !== undefined ? data.wind.speed + "MP" : "2MP"}
          </p>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
  );
};

export default hero;

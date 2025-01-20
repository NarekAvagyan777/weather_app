import { ChangeEvent, useEffect, useState } from "react";
import { WeatherMeasureUnit } from "../../../app/providers/StoreProvider/model";
import { setWeatherUnit } from "../../../app/store/model/slices/weatherSlice";
import { getCurrentWeather } from "../../../entities/CurrentWeather";
import { getForecastData } from "../../../entities/ForecastWeather";
import { $api, useAppDispatch, useAppSelector } from "../../../shared/libs";
import { Toggle } from "../../../shared/ui";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const [cityName, setCityName] = useState("");
  const weatherUnit = useAppSelector(
    (state) => state.weatherReducer.weatherUnit
  );
  const currentWeather = useAppSelector(
    (state) => state.weatherReducer.currentWeather
  );

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const handleCitySearch = async () => {
    try {
      dispatch(getCurrentWeather({ weatherUnit, cityName }));
      dispatch(getForecastData({ weatherUnit, cityName }));
    } catch (e) {
      console.log("error", e);
      alert("Please write valid city name");
    }
  };

  const onOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    dispatch(setWeatherUnit(value as WeatherMeasureUnit));
    dispatch(
      getCurrentWeather({
        cityName: currentWeather?.name,
        weatherUnit: WeatherMeasureUnit[value],
      })
    );

    dispatch(
      getForecastData({
        weatherUnit: WeatherMeasureUnit[value],
        cityName: currentWeather?.name,
      })
    );
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          if (latitude && longitude) {
            (async () => {
              try {
                const currentCityData = await $api.get(
                  `/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5`
                );

                const { local_names, ...others } = currentCityData?.data?.[0];

                const response = await $api.get(
                  `/data/2.5/weather?lat=${others?.lat}&lon=${others?.lon}&units=${weatherUnit}`
                );

                const data = response.data;
              } catch (e) {
                console.log("error", e);
              }
            })();
          }
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              console.error("The request to get user location timed out.");
              break;
          }
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className={styles.navbar}>
      <div></div>
      <div className={styles.navbar_input}>
        <input type="text" onChange={onChangeHandler} value={cityName} />
        <button
          onClick={handleCitySearch}
          disabled={!cityName.length}
          type="button"
        >
          Search City
        </button>
      </div>
      <div>
        <Toggle onOptionChange={onOptionChange} weatherUnit={weatherUnit} />
      </div>
    </div>
  );
};

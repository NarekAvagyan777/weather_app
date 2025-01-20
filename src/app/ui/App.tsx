import { useEffect } from "react";
import { getCurrentWeather } from "../../entities/CurrentWeather/index.ts";
import { getForecastData } from "../../entities/ForecastWeather/index.ts";
import { $api } from "../../shared/libs/axiosInstance.ts";
import { useAppDispatch, useAppSelector } from "../../shared/libs/index.ts";
import { Navbar } from "../../widgets/Navbar/index.ts";
import styles from "../styles/App.module.scss";
import { AppRouter } from "./AppRouter.tsx";

function App() {
  const dispatch = useAppDispatch();
  const weatherUnit = useAppSelector(
    (state) => state.weatherReducer.weatherUnit
  );

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          if (latitude && longitude) {
            (async () => {
              try {
                const currentLocationData = await $api.get(
                  `/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5`
                );

                const { local_names, ...others } =
                  currentLocationData?.data?.[0];

                dispatch(
                  getCurrentWeather({
                    lat: latitude,
                    lon: longitude,
                    weatherUnit,
                  })
                );
                dispatch(
                  getForecastData({
                    lat: latitude,
                    lon: longitude,
                    weatherUnit,
                  })
                );
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
    <>
      <Navbar />
      <div className={styles.page_wrapper}>
        <AppRouter />
      </div>
    </>
  );
}

export default App;

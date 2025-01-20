import { FiveDaysForecast } from "../../../features/FiveDaysForecast";
import { getImageUrl } from "../../../shared/libs";
import { useAppSelector } from "../../../shared/libs/reduxHooks";

export const HomePage = () => {
  const currentWeather = useAppSelector(
    (state) => state.weatherReducer.currentWeather
  );
  const forecastData = useAppSelector(
    (state) => state.weatherReducer.forecastData
  );

  const selectedDay = useAppSelector(
    (state) => state.weatherReducer.selectedDay
  );

  const forecastDataLoading = useAppSelector(
    (state) => state.weatherReducer.forecastDataLoading
  );

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const isToday = formattedDate === selectedDay;

  return (
    <div style={{ paddingLeft: 10, paddingRight: 10 }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            columnGap: 30,
            alignItems: "start",
          }}
        >
          <div>
            <div>
              <h1>{currentWeather?.name}</h1>
              <h2 style={{ marginTop: 10 }}>
                {isToday
                  ? currentWeather?.main?.temp + "°"
                  : forecastData?.[selectedDay]?.[0]?.main?.temp + "°"}
              </h2>
              {isToday ? (
                <img
                  src={getImageUrl(currentWeather?.weather?.[0]?.icon)}
                  alt="Weather Icon"
                />
              ) : (
                <img
                  src={getImageUrl(
                    forecastData?.[selectedDay]?.[0]?.weather?.[0]?.icon
                  )}
                  alt="Weather Icon"
                />
              )}
            </div>
          </div>

          {forecastDataLoading ? (
            <h2>Loading...</h2>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: 6,
              }}
            >
              {forecastData?.[selectedDay]?.map((el, index: number) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "4px",
                    width: 300,
                    borderBottomWidth: 1,
                    justifyContent: "space-between",
                    borderBottomStyle: "solid",
                    borderBottomColor: "black",
                  }}
                >
                  <p style={{ marginRight: 4 }}>{el?.dt_txt.slice(11, 100)}</p>
                  <div
                    style={{
                      display: "flex",
                      columnGap: 6,
                      alignItems: "center",
                    }}
                  >
                    <p>{el?.main?.temp + "°"}</p>
                    <img
                      src={getImageUrl(el?.weather?.[0]?.icon)}
                      alt="Weather Icon"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <FiveDaysForecast />
    </div>
  );
};

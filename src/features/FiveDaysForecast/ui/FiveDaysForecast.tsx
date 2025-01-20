import { useMemo } from "react";
import { setSelectedDay } from "../../../app/store/model/slices/weatherSlice";
import {
  getImageUrl,
  useAppDispatch,
  useAppSelector,
} from "../../../shared/libs";

export const FiveDaysForecast = () => {
  const dispatch = useAppDispatch();

  const forecastData = useAppSelector(
    (state) => state.weatherReducer.forecastData
  );

  const selectedDay = useAppSelector(
    (state) => state.weatherReducer.selectedDay
  );

  const forecastDataLoading = useAppSelector(
    (state) => state.weatherReducer.forecastDataLoading
  );

  const days = useMemo(() => {
    const entried = forecastData ? Object.entries(forecastData) : [];
    return entried;
  }, [forecastData]);

  const handleDaySelect = (day: string) => {
    dispatch(setSelectedDay(day));
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Forecast for 5 days</h3>

      {forecastDataLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: 6,
            flexWrap: "wrap",
            rowGap: 6,
          }}
        >
          {days?.slice(0, 5)?.map(([key, value]) => (
            <div
              key={key}
              onClick={() => handleDaySelect(key)}
              style={{
                borderWidth: 1,
                borderRadius: "20%",
                display: "flex",
                cursor: "pointer",
                justifyContent: "center",
                alignItems: "center",
                borderColor: "black",
                borderStyle: "solid",
                padding: 10,
                width: 200,
                height: 200,
                boxShadow:
                  selectedDay === key
                    ? "0px 8px 12px rgba(0, 0, 0, 1)"
                    : "none",
              }}
            >
              <div>
                {new Date(value[0]?.dt * 1000).toLocaleDateString()}
                <p>{value[0]?.main?.temp + "°"}</p>
                <img
                  src={getImageUrl(value[0]?.weather?.[0]?.icon)}
                  alt="Weather Icon"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

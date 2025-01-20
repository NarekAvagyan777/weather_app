import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentWeather } from "../../../../entities/CurrentWeather";
import { getForecastData } from "../../../../entities/ForecastWeather";
import type {
  CurrentWeatherForState,
  WeatherSliceStateSchema,
} from "../../../providers/StoreProvider/model";

const today = new Date();
const formattedDate = today.toISOString().split("T")[0];

const initialState: WeatherSliceStateSchema = {
  weatherUnit: "metric",
  currentWeather: null,
  forecastData: null,
  forecastDataLoading: false,
  error: null,
  isLoading: false,
  selectedDay: formattedDate,
};

const weatherSlice = createSlice({
  name: "weatherSlice",
  initialState,
  reducers: {
    setWeatherUnit: (state, { payload }: PayloadAction<string>) => {
      if (payload === "CELSIUS") {
        state.weatherUnit = "metric";
      } else {
        state.weatherUnit = "imperial";
      }
    },
    setSelectedDay: (state, { payload }: PayloadAction<string>) => {
      state.selectedDay = payload;
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(
      getCurrentWeather.fulfilled,
      (state, { payload }: PayloadAction<CurrentWeatherForState>) => {
        state.currentWeather = payload;
        state.isLoading = false;
      }
    );
    addCase(getCurrentWeather.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload as string;
    });
    addCase(getCurrentWeather.pending, (state) => {
      state.isLoading = true;
    });
    addCase(getForecastData.fulfilled, (state, { payload }) => {
      const groupedByDate = payload?.list?.reduce((acc, timestamp) => {
        const [date] = timestamp?.dt_txt?.split(" ");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(timestamp);
        return acc;
      }, {});

      state.forecastData = groupedByDate;

      state.forecastDataLoading = false;
    });
    addCase(getForecastData.rejected, (state, { payload }) => {
      state.forecastDataLoading = false;
      state.error = payload as string;
    });
    addCase(getForecastData.pending, (state) => {
      state.forecastDataLoading = true;
    });
  },
});

export const { setWeatherUnit, setSelectedDay } = weatherSlice.actions;
export const { reducer } = weatherSlice;

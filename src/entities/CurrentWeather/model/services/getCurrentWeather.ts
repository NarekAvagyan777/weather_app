import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "../../../../shared/libs";
import type { CurrentWeatherArguments } from "../../../../app/providers/StoreProvider/model";

export const getCurrentWeather = createAsyncThunk(
  "weather/getCurrentWeather",
  async (
    { lat, lon, weatherUnit, cityName }: CurrentWeatherArguments,
    { rejectWithValue }
  ) => {
    try {
      const response = await $api.get(
        cityName
          ? `/data/2.5/weather?units=${weatherUnit}&q=${cityName}`
          : `/data/2.5/weather?units=${weatherUnit}&lat=${lat}&lon=${lon}`
      );
      return response.data;
    } catch (e) {
      console.log("error", e);
      alert(e?.response?.data?.message);
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

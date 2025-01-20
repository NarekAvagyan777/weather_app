import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "../../../../shared/libs";
import { ForecastArguments } from "../../../../app/providers/StoreProvider/model";

export const getForecastData = createAsyncThunk(
  "weather/getForecastData",
  async (
    { cityName, lat, lon, weatherUnit }: ForecastArguments,
    { rejectWithValue }
  ) => {
    try {
      const response = await $api.get(
        cityName
          ? `/data/2.5/forecast?q=${cityName}&units=${weatherUnit}`
          : `/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${weatherUnit}`
      );

      return response.data;
    } catch (e) {
      console.log("error", e);

      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

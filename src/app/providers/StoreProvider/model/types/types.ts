export type WeatherSliceStateSchema = {
  weatherUnit: "metric" | "imperial";
  currentWeather: CurrentWeatherForState | null;
  forecastData: ForecastDataType | null;
  error: null | string;
  isLoading: boolean;
  selectedDay: string;
  forecastDataLoading: boolean;
};

export type ForecastDataSchema = {
  dt_txt?: string;
  dt?: string;
  main: { temp: number };
  weather: Array<{ icon: string }>;
};

export type ForecastDataType = Record<string, Array<ForecastDataSchema>>;

export type CurrentWeatherForState = {
  name: string;
  main: {
    temp: number;
  };
  weather: Array<object>;
};

export enum WeatherMeasureUnit {
  CELSIUS = "metric",
  FARENHEIT = "imperial",
}

export type CurrentWeatherArguments = {
  lat?: undefined | number;
  lon?: undefined | number;
  cityName?: undefined | string;
  weatherUnit: WeatherMeasureUnit | string;
};

export type ForecastArguments = {
  lat?: undefined | number;
  lon?: undefined | number;
  cityName?: undefined | string;
  weatherUnit: WeatherMeasureUnit | string;
};

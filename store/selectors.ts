import type { RootState } from "./store";

export const selectCurrentWeather = (state: RootState) =>
    state.CurrentWeatherSliceReducer;

export const selectForecast = (state: RootState) =>
    state.ForecastSliceReducer;

export const selectUnit = (state: RootState) =>
    state.settings.unit;

export const selectSettings = (state: RootState) => state.settings;
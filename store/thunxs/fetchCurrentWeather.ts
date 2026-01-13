import type { AppDispatch, RootState } from "../store";
import { WeatherService } from "../../src/services/WeatherService";
import { CurrentWeatherSlice } from "../slices/currentWeatherSlice";

export const fetchCurrentWeather =
    (city: string) =>
        async (dispatch: AppDispatch, getState: () => RootState) => {

            const state = getState();
            const unit = state.settings.unit;

            dispatch(CurrentWeatherSlice.actions.fetchCurrentWeather());

            try {
                const res = await WeatherService.getCurrentWeather(city, unit);
                dispatch(
                    CurrentWeatherSlice.actions.fetchCurrentWeatherSuccess(res.data)
                );
            } catch (error) {
                dispatch(
                    CurrentWeatherSlice.actions.fetchCurrentWeatherError(
                        'Error fetching weather'
                    )
                );
            }
        };

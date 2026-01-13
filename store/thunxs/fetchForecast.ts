import type { AppDispatch } from "../store";
import { WeatherService } from '../../src/services/WeatherService';
import { ForecastSlice } from '../slices/forecastSlice';

export const fetchForecast =
  (city: string, unit: 'metric' | 'imperial') =>
    async (dispatch: AppDispatch) => {

      dispatch(ForecastSlice.actions.fetchForecast());

      try {
        const res = await WeatherService.getForecast(city, unit);
        dispatch(ForecastSlice.actions.fetchForecastSuccess(res.data));
      } catch (e) {
        dispatch(ForecastSlice.actions.fetchForecastError('Error fetching forecast'));
      }
    };

import type { AxiosResponse } from 'axios';
import api from '../api/api';
import type { Weather, Forecast } from '../../store/types/types';



export class WeatherService {
    static getCurrentWeather(
        city: string,
        unit: 'metric' | 'imperial'
    ): Promise<AxiosResponse<Weather>> {
        return api.get<Weather>('/weather', {
            params: {
                q: city,
                units: unit,
            },
        });
    }
    static getForecast(city: string, unit: 'metric' | 'imperial'): Promise<AxiosResponse<Forecast>> {
        return api.get('/forecast', {
            params: {
                q: city,
                units: unit
            }
        });
    }
}

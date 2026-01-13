import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Weather } from '../types/types';

interface CurrentWeatherState {
    weather: Weather | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: CurrentWeatherState = {
    weather: null,
    isLoading: false,
    error: null,
};

export const CurrentWeatherSlice = createSlice({
    name: 'current_weather',
    initialState,
    reducers: {
        fetchCurrentWeather(state) {
            state.isLoading = true;
            state.error = null;
        },

        fetchCurrentWeatherSuccess(
            state,
            action: PayloadAction<Weather>
        ) {
            state.isLoading = false;
            state.weather = action.payload;
        },

        fetchCurrentWeatherError(
            state,
            action: PayloadAction<string>
        ) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export default CurrentWeatherSlice.reducer;

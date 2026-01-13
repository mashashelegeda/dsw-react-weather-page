import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Forecast } from '../types/types';

interface ForecastState {
    forecast: Forecast | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: ForecastState = {
    forecast: null,
    isLoading: false,
    error: null,
};

export const ForecastSlice = createSlice({
    name: 'forecast',
    initialState,
    reducers: {
        fetchForecast(state) {
            state.isLoading = true;
            state.error = null;
        },
        fetchForecastSuccess(state, action: PayloadAction<Forecast>) {
            state.isLoading = false;
            state.forecast = action.payload;
        },
        fetchForecastError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        clearForecast(state) {
            state.forecast = null;
        },
    },
});
export const { fetchForecast, fetchForecastSuccess, fetchForecastError, clearForecast } = ForecastSlice.actions;

export default ForecastSlice.reducer;

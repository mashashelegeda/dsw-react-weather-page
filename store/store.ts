import { combineReducers, configureStore } from '@reduxjs/toolkit';
import CurrentWeatherSliceReducer from './slices/currentWeatherSlice';
import ForecastSliceReducer from './slices/forecastSlice';
import settingsReducer from './slices/settingSlice';

const rootReducer = combineReducers({
    CurrentWeatherSliceReducer,
    ForecastSliceReducer,
    settings: settingsReducer, // 👈 ИМЯ ВАЖНО
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

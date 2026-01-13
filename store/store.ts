import { combineReducers, configureStore } from '@reduxjs/toolkit';
import CurrentWeatherSliceReducer from './slices/currentWeatherSlice';
import ForecastSliceReducer from './slices/forecastSlice';
import settingsReducer from './slices/settingSlice';

const rootReducer = combineReducers({
    CurrentWeatherSliceReducer,
    ForecastSliceReducer,
    settings: settingsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
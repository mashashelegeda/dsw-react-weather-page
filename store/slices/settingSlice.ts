import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
    unit: 'metric' | 'imperial';
    favorites: string[];
}

const initialState: SettingsState = {
    unit: 'metric',
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

export const settingSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setUnit(state, action: PayloadAction<'metric' | 'imperial'>) {
            state.unit = action.payload;
            localStorage.setItem('unit', state.unit);
        },
        toggleFavorite(state, action: PayloadAction<string>) {
            const city = action.payload;
            if (state.favorites.includes(city)) {
                state.favorites = state.favorites.filter(c => c !== city);
            } else {
                state.favorites.push(city);
            }
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
    },
});
export const { setUnit, toggleFavorite } = settingSlice.actions;
export default settingSlice.reducer;

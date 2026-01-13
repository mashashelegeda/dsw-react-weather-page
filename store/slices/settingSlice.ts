
import { createSlice, } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type TemperatureUnit = 'metric' | 'imperial';

interface SettingsState {
    unit: TemperatureUnit;
}

const initialState: SettingsState = {
    unit: 'metric',
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setUnit(state, action: PayloadAction<TemperatureUnit>) {
            state.unit = action.payload;
        },
    },
});

export const { setUnit } = settingsSlice.actions;
export default settingsSlice.reducer;

import React from 'react';
import s from './ThisDay.module.scss';
import type { Weather } from '../../../../store/types/types';
import { getCityTime } from '../../../utils/date';
import { useCustomDispatch, useCustomSelector } from '../../../hooks/store';
import { selectUnit, selectSettings } from '../../../../store/selectors';
import { toggleFavorite } from '../../../../store/slices/settingSlice';

interface Props {
    weather: Weather | null;
}

export const ThisDay = ({ weather }: Props) => {
    const dispatch = useCustomDispatch();
    const unit = useCustomSelector(selectUnit);
    const { favorites } = useCustomSelector(selectSettings);

    if (!weather || !weather.main || !weather.dt || !weather.timezone) {
        return <div className={s.this_day}>Loading current weather...</div>;
    }

    const tempUnitSymbol = unit === 'metric' ? '°C' : '°F';
    const isFavorite = favorites.includes(weather.name);

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(weather.name));
    };

    return (
        <div className={s.this_day}>
            <div className={s.top_block}>
                <div className={s.top_block_wrapper}>
                    <div className={s.this_temp}>
                        {Math.floor(weather.main.temp)}{tempUnitSymbol}
                    </div>
                    <div className={s.this_day_name}>
                        {weather.name}
                        <span
                            className={`${s.favorite} ${isFavorite ? s.active : ''}`}
                            onClick={handleToggleFavorite}
                        >
                            ★
                        </span>
                    </div>
                </div>

                {weather.weather && weather.weather[0] && (
                    <div className={s.weather_icon}>
                        <img
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                        />
                    </div>
                )}
            </div>

            <div className={s.bottom_block}>
                <div className={s.this_time}>
                    Time: <span>{getCityTime(weather.dt, weather.timezone)}</span>
                </div>
                <div className={s.this_city}>
                    City: <span>{weather.name}</span>
                </div>
            </div>
        </div>
    );
};

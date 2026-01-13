import React from 'react';
import s from './ThisDay.module.scss';
import { GlobalSvgSelector } from '../../../assets/img/GlobalSvgSelector';
import type { Weather } from '../../../../store/types/types';
import { getCityTime } from '../../../utils/date';
import { useCustomSelector } from '../../../hooks/store';
import { selectUnit } from '../../../../store/selectors';




interface Props {
    weather: Weather;
}

export const ThisDay = ({ weather }: Props) => {
    const unit = useCustomSelector(selectUnit);
    const tempUnitSymbol = unit === 'metric' ? '°C' : '°F';


    return (
        <div className={s.this_day}>
            <div className={s.top_block}>
                <div className={s.top_block_wrapper}>
                    <div className={s.this_temp}>{Math.floor(weather.main.temp)}{tempUnitSymbol}</div>
                    <div className={s.this_day_name}>{weather.name}</div>
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
                <div className={s.this_time}>Time: <span>{getCityTime(weather.dt, weather.timezone)}</span></div>
                <div className={s.this_city}>City: <span>{weather.name}</span></div>

            </div>

        </div>
    )
}

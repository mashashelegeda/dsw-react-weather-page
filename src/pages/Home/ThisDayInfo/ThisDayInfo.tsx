import s from './ThisDayInfo.module.scss';
import { ThisDayItem } from './ThisDayItem';
import type { Weather } from '../../../../store/types/types';
import Select from 'react-select';
import { useCustomDispatch, useCustomSelector } from '../../../hooks/store';
import { setUnit } from '../../../../store/slices/settingSlice';
import { selectUnit } from '../../../../store/selectors';
import { fetchCurrentWeather } from '../../../../store/thunxs/fetchCurrentWeather';

interface Props {
    weather: Weather;
}

export interface Item {
    icon_id: string;
    name: string;
    value: string;
}


const getWindDirection = (deg: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
};


export const ThisDayInfo = ({ weather }: Props) => {
    const dispatch = useCustomDispatch();
    const unit = useCustomSelector(selectUnit);

    const options = [
        { value: 'metric', label: 'Celsius' },
        { value: 'imperial', label: 'Fahrenheit' },
    ];

    const colorStyles = {
        control: (styles: any) => ({
            ...styles,
            backgroundColor: 'rgba(154, 177, 245, 0.2)',
            width: '250px',
            height: '40px',
            border: 'none',
            borderRadius: '10px',
            fontSize: '16px',
            marginBottom: '20px',
        }),
    };

    const handleChange = (option: any) => {
        dispatch(setUnit(option.value));
        dispatch(fetchCurrentWeather(weather.name));
    };

    const tempUnitSymbol = unit === 'metric' ? '°C' : '°F';

    const items: Item[] = [
        {
            icon_id: 'temp',
            name: 'Temperature',
            value: `${Math.round(weather.main.temp)}° – feels like ${Math.round(weather.main.feels_like)}°`,
        },
        {
            icon_id: 'pressure',
            name: 'Pressure',
            value: `${weather.main.pressure} hPa`,
        },
        {
            icon_id: 'precipitation',
            name: 'Precipitation type',
            value: weather.weather[0].description,
        },
        {
            icon_id: 'precipitation',
            name: 'Precipitation amount',
            value: weather.rain?.['1h']
                ? `${weather.rain['1h']} mm`
                : weather.snow?.['1h']
                    ? `${weather.snow['1h']} mm`
                    : 'No precipitation',
        },
        {
            icon_id: 'wind',
            name: 'Wind',
            value: `${weather.wind.speed} m/s, ${getWindDirection(weather.wind.deg)}`,
        },
        {
            icon_id: 'cloud',
            name: 'Cloudiness',
            value: `${weather.clouds.all}%`,
        },

    ];


    return (
        <div className={s.this_day_info}>
            <div className={s.this_day_info_items}>
                <Select
                    value={options.find(o => o.value === unit)}
                    onChange={handleChange}
                    options={options}
                    styles={colorStyles}
                    placeholder="Temperature scale"
                />

                {items.map(item => (
                    <ThisDayItem key={item.icon_id} item={item} />
                ))}
            </div>
        </div>
    );
};

import React, { useState } from 'react';
import s from './Header.module.scss';
import { GlobalSvgSelector } from '../../../assets/img/GlobalSvgSelector';
import Select from 'react-select';
import { fetchForecast } from '../../../../store/thunxs/fetchForecast';
import { fetchCurrentWeather } from '../../../../store/thunxs/fetchCurrentWeather';
import { useCustomDispatch } from '../../../hooks/store';
import { useCustomSelector } from '../../../hooks/store';
import { selectUnit } from '../../../../store/selectors';

interface HeaderProps { }

export const Header = (props: HeaderProps) => {
    const dispatch = useCustomDispatch();
    const unit = useCustomSelector(selectUnit);

    const options = [
        { value: 'Warsaw', label: 'Warsaw' },
        { value: 'Krakow', label: 'Kraków' },
        { value: 'Wroclaw', label: 'Wrocław' },
        { value: 'Gdansk', label: 'Gdańsk' },
        { value: 'Poznan', label: 'Poznań' },
        { value: 'Lodz', label: 'Łódź' },
        { value: 'Szczecin', label: 'Szczecin' },
        { value: 'Katowice', label: 'Katowice' },
        { value: 'Milan', label: 'Milan' },
    ];

    const [selectedCity, setSelectedCity] = useState(options[2]);

    const colorStyles = {
        control: (styles: any) => ({
            ...styles,
            backgroundColor: 'rgba(154, 177, 245, 0.2)',
            width: "250px",
            height: "40px",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            zIndex: 100,
        }),
        option: (styles: any) => {
            return {
                ...styles,
                fontSize: '14px',
            };
        },
    }

    const handleChange = (option: any) => {
        setSelectedCity(option);
        dispatch(fetchCurrentWeather(option.value));
        dispatch(fetchForecast(option.value, unit));

    }
    return (

        <header className={s.header}>
            <div className={s.wrapper}>
                <div className={s.logo}> <GlobalSvgSelector id="header-logo" /></div>
                <div className={s.title}>
                    WeatherApp
                </div>
            </div>
            <Select
                value={selectedCity}
                onChange={handleChange}
                options={options}
                styles={colorStyles}
            />

        </header>
    )
}



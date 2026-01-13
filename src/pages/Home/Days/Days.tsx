import React, { useEffect } from 'react';
import s from './Days.module.scss';
import { Card } from './Card';
import { Tabs } from './Tabs';
import { useCustomDispatch, useCustomSelector } from '../../../hooks/store';
import { selectForecast } from '../../../../store/selectors';
import { fetchForecast } from '../../../../store/thunxs/fetchForecast';
import { clearForecast } from '../../../../store/slices/forecastSlice';
import type { Day } from '../../../../store/types/types';
import { selectUnit } from '../../../../store/selectors';

export const Days = () => {
    const dispatch = useCustomDispatch();
    const { forecast, isLoading } = useCustomSelector(selectForecast);
    const unit = useCustomSelector(selectUnit);


    useEffect(() => {
        dispatch(clearForecast());
        dispatch(fetchForecast('Wroclaw', unit));
    }, [dispatch, unit]);

    if (isLoading || !forecast) return <div>Loading...</div>;


    const daysGrouped = forecast.list.reduce((acc: any, item: any) => {
        const date = new Date(item.dt * 1000).toLocaleDateString('en-GB'); // dd/mm/yyyy
        if (!acc[date]) acc[date] = [];
        acc[date].push(item);
        return acc;
    }, {});

    const tempSymbol = unit === 'metric' ? '°C' : '°F';

    const dayArray: Day[] = Object.keys(daysGrouped).map(dateKey => {
        const dayItems = daysGrouped[dateKey];
        const temps = dayItems.map((i: any) => i.main.temp);
        const weather = dayItems[0].weather[0];

        // Берем timestamp первого элемента для определения дня недели
        const timestamp = dayItems[0].dt * 1000;
        const weekday = new Date(timestamp).toLocaleDateString('en-GB', { weekday: 'short' });

        return {
            day: weekday,                  // теперь корректно выводит Mon, Tue, ...
            day_info: dateKey,             // dd/mm/yyyy
            temp_day: Math.max(...temps).toFixed(0) + '°',
            temp_night: Math.min(...temps).toFixed(0) + '°',
            info: weather.description,
            icon_id: weather.icon,
        };
    });

    return (
        <>
            <Tabs />
            <div className={s.days}>
                {dayArray.map((day: Day) => (
                    <Card key={day.day} day={day} />
                ))}
            </div>
        </>
    );
};

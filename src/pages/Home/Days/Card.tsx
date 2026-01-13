import React from 'react'
import s from './Days.module.scss'
import type { Day } from '../../../../store/types/types'
import { GlobalSvgSelector } from '../../../assets/img/GlobalSvgSelector';
import { useEffect } from 'react';
import { useCustomDispatch, useCustomSelector } from '../../../hooks/store';
import { fetchForecast } from '../../../../store/thunxs/fetchForecast';
import { selectForecast } from '../../../../store/selectors';
import { selectUnit } from '../../../../store/selectors';

interface CardProps {
    day: Day;
}
export const Card = ({ day }: CardProps) => {
    return (
        <div className={s.card}>
            <div className={s.day}>{day.day}</div>
            <div className={s.day_info}>{day.day_info}</div>
            <div className={s.img}>
                <img
                    src={`http://openweathermap.org/img/wn/${day.icon_id}@2x.png`}
                    alt={day.info}
                />
            </div>
            <div className={s.temp_day}>Day: {day.temp_day}</div>
            <div className={s.temp_night}>Night: {day.temp_night}</div>
            <div className={s.info}>{day.info}</div>
        </div>
    );
};

const Tabs = () => {
    return (
        <div className={s.tabs}>
            <div className={`${s.tab} ${s.active}`}>Week</div>
        </div>
    );
};

export const Days = () => {
    const dispatch = useCustomDispatch();
    const { forecast, isLoading } = useCustomSelector(selectForecast);
    const unit = useCustomSelector(selectUnit);

    useEffect(() => {
        dispatch(fetchForecast('Wroclaw', unit));
    }, [dispatch, unit]);

    if (isLoading || !forecast) return <div>Loading...</div>;


    const daysGrouped = forecast.list.reduce((acc: any, item: any) => {
        const date = new Date(item.dt * 1000).toLocaleDateString('en-GB'); // dd/mm/yyyy
        if (!acc[date]) acc[date] = [];
        acc[date].push(item);
        return acc;
    }, {});


    const dayArray: Day[] = Object.keys(daysGrouped).map(date => {
        const temps = daysGrouped[date].map((i: any) => i.main.temp);
        const weather = daysGrouped[date][0].weather[0];
        return {
            day: new Date(date).toLocaleDateString('en-GB', { weekday: 'short' }),
            day_info: date,
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
                {dayArray.map(day => (
                    <Card key={day.day_info} day={day} />
                ))}
            </div>
        </>
    );
};
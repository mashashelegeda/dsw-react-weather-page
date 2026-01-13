import React from 'react';
import s from './Popup.module.scss';
import { GlobalSvgSelector } from '../../../assets/img/GlobalSvgSelector';
import Select from 'react-select';
import type { Item } from '../../Home/ThisDayInfo/ThisDayInfo';
import { ThisDayItem } from '../../Home/ThisDayInfo/ThisDayItem';
import { useEffect } from 'react';

interface Props { }

export const Popup = ({ }: Props) => {
    const items: Item[] = [
        { icon_id: 'temp', name: 'Temperature', value: '20° - feels like 17°' },
        { icon_id: 'pressure', name: 'Pressure', value: '765 mmHg - normal' },
        { icon_id: 'precipitation', name: 'Precipitation', value: 'No precipitation' },
        { icon_id: 'wind', name: 'Wind', value: '3 m/s southwest - light breeze' },
    ];

    return (


        useEffect(() => {
            document.body.style.overflow = 'hidden';

            return () => {
                document.body.style.overflow = 'auto';
            };
        },
            []),


        <>
            <div className={s.blur}></div>
            <div className={s.popup}>
                <div className={s.this_day}>
                    <div className={s.day_temp}>20°</div>
                    <div className={s.day_name}>Wednesday</div>
                    <div className={s.img}><GlobalSvgSelector id="sun" /></div>
                    <div className={s.time}>Time: 21:54</div>
                    <div className={s.city}>City: Wroclaw</div>


                </div>
                <div className={s.this_day_info_items}>
                    {items.map((item: Item) => (
                        <ThisDayItem key={item.icon_id} item={item} />
                    ))}
                </div>
                <div className={s.close}>
                    <GlobalSvgSelector id="close" />
                </div>
            </div>
        </>
    )
}



import React, { useEffect } from "react";
import s from "./Home.module.scss";
import { ThisDay } from "./ThisDay/ThisDay";
import { ThisDayInfo } from "./ThisDayInfo/ThisDayInfo";
import { Days } from "./Days/Days";
import { useCustomDispatch, useCustomSelector } from "../../hooks/store";
import { fetchCurrentWeather } from "../../../store/thunxs/fetchCurrentWeather";
import { selectCurrentWeather } from "../../../store/selectors";

interface HomeProps {
}

export const Home = (props: HomeProps) => {
    const dispatch = useCustomDispatch();

    const { weather } = useCustomSelector(selectCurrentWeather);

    useEffect(() => {
        dispatch(fetchCurrentWeather('wroclaw'));
    },
        [dispatch]);

    return (
        <div className={s.home}>
            <div className={s.wrapper}>
                {weather ? (
                    <>
                        <ThisDay weather={weather} />
                        <ThisDayInfo weather={weather} />
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <Days />

        </div>
    )
}

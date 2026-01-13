import React from "react";
import s from "./Days.module.scss";

interface Props { }

export const Tabs = (props: Props) => {
    const tabs = [
        { value: "5 days" },

    ];

    return (
        <div className={s.tabs}>
            <div className={s.tabs_wrapper}>
                {tabs.map((t) => (
                    <div className={s.tab + " " + s.active} key={t.value}>
                        {t.value}
                    </div>
                ))}
            </div>

        </div>
    );
};

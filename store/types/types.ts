export interface Weather {
    dt: number;
    timezone: number;
    name: string;

    main: {
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
    };

    weather: {
        main: string;
        description: string;
        icon: string;
    }[];

    wind: {
        speed: number;
        deg: number;
    };

    clouds: {
        all: number;
    };

    rain?: {
        '1h'?: number;
        '3h'?: number;
    };

    snow?: {
        '1h'?: number;
        '3h'?: number;
    };
}



export interface Forecast {
    list: {
        dt: number;
        main: {
            temp: number;
            feels_like: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            humidity: number;
        };
        weather: { main: string; description: string; icon: string }[];
        wind: { speed: number; deg: number };
        dt_txt: string;
    }[];
    city: {
        name: string;
        timezone: number;
    };
}

export interface Day {
    day: string;
    day_info: string;
    icon_id: string;
    temp_day: string;
    temp_night: string;
    info: string;
}

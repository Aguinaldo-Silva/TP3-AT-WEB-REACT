import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


dayjs.extend(utc);
dayjs.extend(timezone);

const adjustDateTimeForTimezone = (dateString) => {
    if (!dateString) return new Date();
    const dateUTC = dayjs.utc(dateString);
    const dateInUTCMinus = dateUTC.tz('America/Sao_Paulo');

    return dayjs(dateInUTCMinus.format());
};

const handleChange = (data, setData, value, field) => {
    const d = data;
    d[field].value = value
    setData(() => ({
        ...d
    }));
}

export {
    handleChange,
    adjustDateTimeForTimezone
}
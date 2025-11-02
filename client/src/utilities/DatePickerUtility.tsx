import { Time } from '../types/types';
export const monthsName = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
export const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function isDateEqual(
    year: number,
    month: number,
    day: number,
    compareDate: Date | null,
): boolean {
    if (!compareDate) {
        return false;
    }
    return (
        year === compareDate.getFullYear() &&
        month === compareDate.getMonth() &&
        day === compareDate.getDate()
    );
}

export function getDaysInMonth(month: number, year: number): number {
    // February in leap year has 29 days
    if (
        month === 1 &&
        ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
    ) {
        return 29;
    }
    return daysInMonth[month];
}

let i = 0;
let count = 0;
export const halfHourTimeIntervalList: Array<string> = Array.from(
    { length: 24 * 2 },
    (_, index) => {
        let time = '';
        if (index % 2 == 0) {
            time = i + ':00';
        } else {
            time = i + ':30';
        }
        i = count == 1 ? i + 1 : i;
        count = count == 1 ? 0 : 1;
        return timeDisplay(undefined, time);
    },
);

export function timeDisplay(time?: Time, timeString?: string): string {
    let hours: number | undefined;
    let minutes: number | undefined;

    if (time) {
        hours = time.hours;
        minutes = time.minutes;
    } else if (timeString) {
        const [h, m] = timeString.split(':');
        hours = Number(h);
        minutes = Number(m);
    }

    // Fallback to "00:00" if values are invalid or missing
    if (
        typeof hours !== 'number' ||
        isNaN(hours) ||
        typeof minutes !== 'number' ||
        isNaN(minutes)
    ) {
        return '00:00';
    }

    const hour = hours.toString().padStart(2, '0');
    const min = minutes.toString().padStart(2, '0');
    return `${hour}:${min}`;
}

export function getTimeObj(time: string): Time {
    const timeArr = time.split(':');
    const newTime: Time = {
        hours: Number(timeArr[0]),
        minutes: Number(timeArr[1]),
    };
    return newTime;
}

export function getWeekDayName(dayNum: number) {
    switch (dayNum) {
        case 0:
            return 'Sun';
        case 1:
            return 'Mon';
        case 2:
            return 'Tue';
        case 3:
            return 'Wed';
        case 4:
            return 'Thu';
        case 5:
            return 'Fri';
        case 6:
            return 'Sat';
    }
}

export function isCurrentYear(date: Date) {
    const now = new Date();
    if (now.getFullYear() === date.getFullYear()) {
        return true;
    } else {
        return false;
    }
}

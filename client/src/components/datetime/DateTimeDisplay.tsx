import {
    differenceInDays,
    format,
    isSameYear,
    isToday,
    isTomorrow,
    isYesterday,
} from 'date-fns';
import { Time } from '../../types/types';
import { timeDisplay } from '../../utilities';

interface DateTimeDisplayProp {
    date: Date | null;
    time: Time | null;
}

const displayTime = (time: Time | null) => {
    if (time) {
        return <div> , {timeDisplay(time)}</div>;
    } else {
        return null;
    }
};

export const DateTimeDisplay = ({ date, time }: DateTimeDisplayProp) => {
    const today = new Date();

    if (!date) {
        return <div className="displayTime future">{displayTime(time)}</div>;
    }
    //Future

    if (isToday(date)) {
        return (
            <div className="displayTime present">Today {displayTime(time)}</div>
        );
    } else if (today < date) {
        if (isTomorrow(date)) {
            return (
                <div className="displayTime future">
                    Tomorrow {displayTime(time)}
                </div>
            );
        }
        if (isSameYear(date, today)) {
            return (
                <div className="displayTime future">
                    {format(date, 'EE dd MMMM')} {displayTime(time)}
                </div>
            );
        }
        return (
            <div className="displayTime future">
                {format(date, 'do MMMM yyyy')}
                {displayTime(time)}
            </div>
        );
    } else {
        //PAST
        if (isYesterday(date)) {
            return <div className="displayTime past">Yesterday</div>;
        }
        const daysAgo = differenceInDays(today, date);
        if (daysAgo < 7) {
            return <div className="displayTime past">{daysAgo} days ago</div>;
        }
        const weeksAgo = Math.floor(daysAgo / 7);
        return (
            <div className="displayTime past">
                {weeksAgo} {weeksAgo == 1 ? 'week' : 'weeks'} ago
            </div>
        );
    }
};

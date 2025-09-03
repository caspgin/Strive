import { useRef } from 'react';
import { getDaysInMonth, isDateEqual } from '../../utilities';
import { DateButton } from './DateButton';

interface CalendarGridProps {
    viewDate: Date;
    selectedDate: Date | null;
    onDateSelect: (day: number) => void;
}
function setStartDay(startDay: number) {
    if (startDay == 0) {
        startDay = 7;
    }
    const dt = document.querySelector(':root') as HTMLHtmlElement;
    dt.style.setProperty('--start-day', startDay.toString());
}

export const CalendarGrid = ({
    viewDate,
    selectedDate,
    onDateSelect,
}: CalendarGridProps) => {
    const today: Date = new Date();
    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();
    const dayNumber = useRef<HTMLDivElement>(null);
    setStartDay(viewDate.getDay());

    return (
        <div className="calendar">
            <div className="weekDay">
                <div>
                    <span>M</span>
                </div>

                <div>
                    <span>T</span>
                </div>
                <div>
                    <span>W</span>
                </div>
                <div>
                    <span>T</span>
                </div>
                <div>
                    <span>F</span>
                </div>
                <div>
                    <span>S</span>
                </div>
                <div>
                    <span>S</span>
                </div>
            </div>
            <div className="dayNumber" ref={dayNumber}>
                {Array.from(
                    {
                        length: getDaysInMonth(currentMonth, currentYear),
                    },
                    (_, i) => i + 1,
                ).map((val: number) => (
                    <DateButton
                        isToday={isDateEqual(
                            currentYear,
                            currentMonth,
                            val,
                            today,
                        )}
                        isSelected={isDateEqual(
                            currentYear,
                            currentMonth,
                            val,
                            selectedDate,
                        )}
                        val={val}
                        handleClick={onDateSelect}
                        key={val}
                    />
                ))}
            </div>
        </div>
    );
};

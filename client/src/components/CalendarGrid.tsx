import { getDaysInMonth, isDateEqual } from '../utilities/DatePickerUtility';
import { DateButton } from './DateButton';

interface CalendarGridProps {
    viewDate: Date;
    selectedDate: Date | null;
    onDateSelect: (day: number) => void;
}

export const CalendarGrid = ({
    viewDate,
    selectedDate,
    onDateSelect,
}: CalendarGridProps) => {
    const today: Date = new Date();
    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();

    return (
        <div className="calendar">
            <div className="weekDay">
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
                <span>S</span>
            </div>
            <div className="dayNumber">
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

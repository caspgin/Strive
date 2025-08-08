import { useEffect, useRef, useState } from 'react';
import './../css/dt.css';
import { CalendarGrid } from './CalendarGrid';
import { MonthNavigation } from './MonthNavigation';
import { ConfirmationBtns } from './ConfirmationBtns';
import { StartTime } from './CalendarTime';
import { TaskType, Time } from '../types/types';

interface DateNTimePickerProp {
    date: Date | null;
    setShowPicker: (picker: boolean) => void;
    time: Time | null;
    setTask: React.Dispatch<React.SetStateAction<TaskType>>;
}

export const DateNTimePicker = ({
    date,
    setShowPicker,
    time,
    setTask,
}: DateNTimePickerProp) => {
    const [selectedDate, setSelectedDate] = useState<Date>(
        () => date || new Date(),
    );
    const [selectedTime, setSelectedTime] = useState<Time | null>(time);
    const [viewDate, setViewDate] = useState<Date>(() => {
        if (date) {
            return new Date(date.getFullYear(), date.getMonth(), 1);
        } else {
            const d = new Date();
            d.setDate(1);
            return d;
        }
    });
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleMouseClick(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setShowPicker(false);
            }
        }

        document.addEventListener('mousedown', handleMouseClick);

        return () => {
            document.removeEventListener('mousedown', handleMouseClick);
        };
    }, [setShowPicker]);

    function OnDateSelect(day: number) {
        setSelectedDate(
            new Date(viewDate.getFullYear(), viewDate.getMonth(), day),
        );
    }

    function handleNextMonth() {
        setViewDate(
            (prev) =>
                new Date(
                    prev.getFullYear(),
                    prev.getMonth() + 1,
                    prev.getDate(),
                ),
        );
    }
    function handlePreviousMonth() {
        setViewDate(
            (prev) =>
                new Date(
                    prev.getFullYear(),
                    prev.getMonth() - 1,
                    prev.getDate(),
                ),
        );
    }

    function OnDone() {
        setTask((prevTask: TaskType) => ({
            ...prevTask,
            date: selectedDate,
            time: selectedTime,
        }));
        setShowPicker(false);
    }

    function OnCancel() {
        setShowPicker(false);
    }

    return (
        <div className="dtContainer" ref={containerRef}>
            <div className="dt">
                <div className="noBtnContainer">
                    <MonthNavigation
                        viewDate={viewDate}
                        onPrevious={handlePreviousMonth}
                        onNext={handleNextMonth}
                    />
                    <CalendarGrid
                        viewDate={viewDate}
                        selectedDate={selectedDate}
                        onDateSelect={OnDateSelect}
                    />
                    <StartTime
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                    />
                </div>
                <ConfirmationBtns onDone={OnDone} onCancel={OnCancel} />
            </div>
        </div>
    );
};

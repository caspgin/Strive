import { useEffect, useState } from 'react';
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
	const [viewDate, setViewDate] = useState<Date>(() => {
		if (date) {
			return new Date(date.getFullYear(), date.getMonth(), 1);
		} else {
			const d = new Date();
			d.setDate(1);
			return d;
		}
	});
	const [selectedTime, setSelectedTime] = useState<Time | null>(time);
	useEffect(() => {
		let day: number = viewDate.getDay();
		if (day == 0) {
			day = 7;
		}
		setStartDay(day);
	}, [viewDate]);

	function OnDateSelect(day: number) {
		setSelectedDate(
			new Date(viewDate.getFullYear(), viewDate.getMonth(), day),
		);
	}

	function setStartDay(startDay: number) {
		const dt = document.querySelector('.dtContainer') as HTMLDivElement;
		dt.style.setProperty('--start-day', startDay.toString());
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
		setShowPicker(false);
		setTask((prev) => ({
			...prev,
			date: selectedDate,
			time: selectedTime,
		}));
	}

	function OnCancel() {
		setShowPicker(false);
	}

	return (
		<div className="dtContainer">
			<div className="dt">
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
				<ConfirmationBtns onDone={OnDone} onCancel={OnCancel} />
			</div>
		</div>
	);
};

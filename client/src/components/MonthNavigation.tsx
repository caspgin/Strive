import { monthsName } from '../utilities/DatePickerUtility';

interface MonthNavigationProps {
	viewDate: Date;
	onPrevious: () => void;
	onNext: () => void;
}

export const MonthNavigation = ({
	viewDate,
	onPrevious,
	onNext,
}: MonthNavigationProps) => (
	<div className="monthPicker">
		<button onClick={onPrevious}>
			<span className="material-symbols-outlined">arrow_back_ios</span>
		</button>
		<div>
			{monthsName[viewDate.getMonth()]} {viewDate.getFullYear()}
		</div>
		<button onClick={onNext}>
			<span className="material-symbols-outlined">arrow_forward_ios</span>
		</button>
	</div>
);

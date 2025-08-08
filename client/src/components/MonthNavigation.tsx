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
        <div className="row">
            <div className="btnContainer">
                <button onClick={onPrevious}>
                    <span className="material-symbols-outlined test">
                        arrow_forward_ios
                    </span>
                </button>
            </div>
            <div className="monthYearLabel">
                {monthsName[viewDate.getMonth()]} {viewDate.getFullYear()}
            </div>
            <div className="btnContainer">
                <button onClick={onNext}>
                    <span className="material-symbols-outlined">
                        arrow_forward_ios
                    </span>
                </button>
            </div>
        </div>
    </div>
);

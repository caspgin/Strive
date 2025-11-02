import {
    getWeekDayName,
    isCurrentYear,
    monthsName,
} from '../../utilities/DatePickerUtility';

import '../../css/taskCompleted.css';

export const TaskCompleted = ({
    completion_date,
}: {
    completion_date: Date | null;
}) => {
    return (
        <div className="taskCompleted">
            <span>Completed:</span>
            {completion_date && (
                <div className="completionDate">
                    {isCurrentYear(completion_date) && (
                        <span>{getWeekDayName(completion_date.getDay())}</span>
                    )}
                    <span>{completion_date.getDate()}</span>
                    <span>{monthsName[completion_date.getMonth()]}</span>
                    {!isCurrentYear(completion_date) && (
                        <span>{completion_date.getFullYear()}</span>
                    )}
                </div>
            )}
        </div>
    );
};

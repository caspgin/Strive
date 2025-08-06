import {
    getTimeObj,
    halfHourTimeIntervalList,
    timeDisplay,
} from '../utilities/DatePickerUtility';
import { DropDownOption, Dropdown } from './FormDropDown';
import { Time } from '../types/types';
import '../css/startTime.css';
const timeOption: Array<DropDownOption> = halfHourTimeIntervalList.map(
    (val) => {
        const obj: DropDownOption = {
            value: val,
            label: val,
        };
        return obj;
    },
);

interface StartTimeProp {
    selectedTime: Time | null;
    setSelectedTime: (time: Time | null) => void;
}
export const StartTime = ({ selectedTime, setSelectedTime }: StartTimeProp) => {
    function onChange(time: string) {
        if (!time) {
            setSelectedTime(null);
        } else {
            const newTime = getTimeObj(time);
            setSelectedTime(newTime);
        }
    }
    return (
        <div className="startTimeContainer">
            <div className="startTime">
                <div>
                    <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                    <Dropdown
                        options={timeOption}
                        value={selectedTime ? timeDisplay(selectedTime) : ''}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    );
};

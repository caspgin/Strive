interface DateButtonProp {
    isToday: boolean;
    isSelected: boolean;
    val: number;
    handleClick: (val: number) => void;
}

export const DateButton = ({
    isToday,
    isSelected,
    val,
    handleClick,
}: DateButtonProp) => {
    const cssClass = isSelected ? 'active' : isToday ? 'today' : '';
    return (
        <div>
            <button className={cssClass} onClick={() => handleClick(val)}>
                {val}
            </button>
        </div>
    );
};

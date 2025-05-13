export interface TaskIconProp {
    complete: boolean;
    hovered: boolean;
    setHovered: React.Dispatch<React.SetStateAction<boolean>>;
    setComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TaskIcon({
    complete,
    hovered,
    setHovered,
    setComplete,
}: TaskIconProp) {
    return (
        <div className="taskIcon">
            <button
                className="completionButton"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => setComplete((prev) => !prev)}
            >
                {complete ? (
                    <span className="material-symbols-outlined">check</span>
                ) : (
                    <span className="material-symbols-outlined">
                        {hovered ? 'check' : 'radio_button_unchecked'}
                    </span>
                )}
            </button>
        </div>
    );
}

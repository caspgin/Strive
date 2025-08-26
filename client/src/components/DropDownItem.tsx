export interface DropDownItemProps {
    title: string;
    icon_name?: string;
    disabled?: boolean;
    handleClick: () => void;
}

export const DropDownItem = ({
    title,
    icon_name,
    disabled,
    handleClick,
}: DropDownItemProps) => {
    const btnClass = disabled ? 'unclickable' : '';
    return (
        <div className="dropdown-item-container">
            <button
                onClick={() => handleClick()}
                className={`dropdown-item ${btnClass}`}
            >
                {icon_name && (
                    <span className="dropdown-item-icon material-symbols-outlined">
                        {icon_name}
                    </span>
                )}
                <span className="dropdown-item-title">{title}</span>
            </button>
        </div>
    );
};

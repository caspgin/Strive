export interface DropDownItemProps {
    title: string;
    icon_name?: string;
    disabled?: boolean;
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DropDownItem = ({
    title,
    icon_name,
    disabled,
    handleClick,
}: DropDownItemProps) => {
    const btnClass = disabled ? 'disabled' : '';
    return (
        <div className="dropdown-item-container">
            <button
                disabled={disabled}
                onClick={handleClick}
                className={`dropdown-item ${btnClass}`}
            >
                <div className="dropdown-item-title">
                    <span>{title}</span>
                    {icon_name && (
                        <div className="dropdown-item-icon">
                            <span className="material-symbols-outlined">
                                {icon_name}
                            </span>
                        </div>
                    )}
                </div>
            </button>
        </div>
    );
};

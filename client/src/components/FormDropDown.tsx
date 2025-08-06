export interface DropDownOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface DropDownProp {
    options: Array<DropDownOption>;
    value: string;
    label?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    name?: string;
    id?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

export const Dropdown = ({
    options,
    value,
    label = '',
    placeholder = 'SetTime',
    onChange,
    name = 'dropdown',
    id = 'dropdown',
    required = false,
    disabled = false,
    className = '',
}: DropDownProp) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className={`dropdown-container ${className}`}>
            {label && <label htmlFor={id}>{label}</label>}

            <select
                id={id}
                name={name}
                value={value}
                onChange={handleChange}
                className="dropdown-select"
                required={required}
                disabled={disabled}
            >
                <option value="">{placeholder}</option>
                {options.map((option: DropDownOption, index: number) => (
                    <option
                        key={option.value + index}
                        value={option.value}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

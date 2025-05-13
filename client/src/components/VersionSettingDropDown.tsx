export interface DropDownProp {
    version: string;
    setVersion: (prev: string) => void;
}

export function Dropdown({ version, setVersion }: DropDownProp) {
    return (
        <select value={version} onChange={(e) => setVersion(e.target.value)}>
            <option value="v1">version 1</option>
            <option value="v2">version 2</option>
        </select>
    );
}

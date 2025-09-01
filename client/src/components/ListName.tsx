import { useEffect, useRef, useState } from 'react';
import '../css/listName.css';

interface ListNameProp {
    name: string;
    setShowNameBox: React.Dispatch<React.SetStateAction<boolean>>;
    updateListName: (name: string) => void;
}

export const ListName = ({
    name,
    setShowNameBox,
    updateListName,
}: ListNameProp) => {
    console.log('ListName Rendered');
    const [listName, setListName] = useState<string>(name);
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setShowNameBox(false);
            }
        };
        document.addEventListener('mousedown', handleMouseDown);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, [setShowNameBox]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setListName(event.target.value);
    }

    function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
        const inputEl = event.target;
        if (inputEl) {
            inputEl.select();
            inputEl.setSelectionRange(0, inputEl.value.length);
        }
    }
    function handleUpdate() {
        if (listName != name) {
            updateListName(listName);
        }
        setShowNameBox(false);
    }

    function handleCancel() {
        setShowNameBox(false);
    }

    return (
        <div className="listNameContainer" ref={containerRef}>
            <h2 className="header">
                {name ? <span>Rename list</span> : <span>Create new list</span>}
            </h2>
            <div className="inputContainer">
                <div className="inputVisibleArea">
                    <span className="input">
                        <input
                            type="text"
                            value={listName}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            placeholder="Enter name"
                            autoFocus
                        />
                    </span>
                </div>
            </div>
            <div className="btnsContainer">
                <div className="cancelContainer">
                    <button onClick={() => handleCancel()}>
                        <span>Cancel</span>
                    </button>
                </div>
                <div className="doneContainer">
                    <button
                        disabled={!listName ? true : false}
                        onClick={() => handleUpdate()}
                    >
                        <span>Done</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

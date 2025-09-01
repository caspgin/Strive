import React, { useState } from 'react';

export interface TaskIconProp {
    id?: number;
    completed: boolean;
    handleCompletion: () => void;
}

export const TaskIcon = React.memo(
    ({ id, completed, handleCompletion }: TaskIconProp) => {
        const [hovered, setHovered] = useState<boolean>(false);
        //console.log(`taskIcon called for task:${id}`);
        return (
            <div className="taskIcon">
                <button
                    className="completionButton"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={(event) => {
                        console.log('clicked');
                        event.stopPropagation();
                        handleCompletion();
                    }}
                >
                    {completed ? (
                        <span className="material-symbols-outlined completed">
                            check
                        </span>
                    ) : (
                        <span className="material-symbols-outlined">
                            {hovered ? 'check' : 'radio_button_unchecked'}
                        </span>
                    )}
                </button>
            </div>
        );
    },
);

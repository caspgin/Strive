export function TaskName({
    complete,
    task,
    isEditing,
    handleChange,
    handleBlur,
    setIsFocused,
    handleKeyDown,
}) {
    return (
        <div className="taskNameContainer">
            {complete ? (
                <div className="taskName complete">
                    <span>{task.name}</span>
                </div>
            ) : (
                <div className="taskName" onClick={() => setIsEditing(true)}>
                    {isEditing ? (
                        <textarea
                            spellCheck={false}
                            ref={textAreaRef}
                            value={task.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={() => setIsFocused(true)}
                            onKeyDown={handleKeyDown}
                            rows={1}
                            placeholder="Title"
                            autoFocus
                        />
                    ) : (
                        <span>{task.name}</span>
                    )}
                </div>
            )}
        </div>
    );
}

import './../css/ConfirmationBtns.css';

interface ConfirmationBtnsProp {
    onDone: () => void;
    onCancel: () => void;
}

export const ConfirmationBtns = ({
    onDone,
    onCancel,
}: ConfirmationBtnsProp) => {
    return (
        <div className="confirmationBtns">
            <button onClick={() => onCancel()}>Cancel</button>
            <button onClick={() => onDone()}>Done</button>
        </div>
    );
};

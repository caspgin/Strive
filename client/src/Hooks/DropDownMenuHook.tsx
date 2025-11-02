import { useCallback, useRef, useState } from 'react';
import { Vector } from '../types/types';

export function useDropDownMenu() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [dropDownBtnPos, setDropDownBtnPos] = useState<Vector>({
        x: 0,
        y: 0,
    });
    const [menuPos, setMenuPos] = useState<Vector>(dropDownBtnPos);
    const onBlurRef = useRef<HTMLDivElement>(null);
    const dropDownBtnRef = useRef<HTMLButtonElement>(null);
    const setMenuPositionRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (node !== null) {
                const x = dropDownBtnPos.x - node.offsetWidth;
                const heightDiff =
                    window.innerHeight - (dropDownBtnPos.y + node.offsetHeight);

                const y =
                    dropDownBtnPos.y -
                    (heightDiff < 0 ? Math.abs(heightDiff) + 20 : 0);
                if (x !== menuPos.x || y !== menuPos.y) {
                    setMenuPos({ x, y });
                }
            }
        },
        [menuPos, dropDownBtnPos],
    );

    const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (isOpen) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
        const rect = dropDownBtnRef.current?.getBoundingClientRect();
        if (rect) {
            setDropDownBtnPos({ x: rect.right, y: rect.bottom });
        }
    };
    const handleClose = (event: React.FocusEvent<HTMLDivElement>) => {
        if (onBlurRef.current?.contains(event.relatedTarget)) {
            return;
        }
        setIsOpen(false);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return {
        handleClose,
        onBlurRef,
        isOpen,
        openMenu,
        dropDownBtnRef,
        setMenuPositionRef,
        menuPos,
        setIsOpen,
        closeMenu,
    };
}

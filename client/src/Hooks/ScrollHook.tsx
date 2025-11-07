import { UIEvent, useState } from 'react';
import { ScrollBorderDir } from '../types/types';

export function useScroll(direction: ScrollBorderDir) {
    const [scrolled, setScrolled] = useState<number>(0);
    const [dir] = useState<ScrollBorderDir>(direction || 'Vertical');
    const handleScroll = (event: UIEvent<HTMLDivElement>) => {
        switch (dir) {
            case 'Horizontal':
                setScrolled(event.currentTarget.scrollLeft);
                break;
            case 'Vertical':
                setScrolled(event.currentTarget.scrollTop);
                break;
        }
    };
    return { scrolled, handleScroll };
}

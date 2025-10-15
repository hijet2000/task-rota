import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768; // md in Tailwind

export const useViewport = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return { width, isMobile: width < MOBILE_BREAKPOINT };
};

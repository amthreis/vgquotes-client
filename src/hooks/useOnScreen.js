import { useEffect, useState, useRef } from 'react';

export function useOnScreen(ref) {
    const [isOnScreen, setIsOnScreen] = useState(false);
    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(([entry]) =>
            setIsOnScreen(entry.isIntersecting)
        );
    }, []);

    useEffect(() => {
        if (!ref)
            return;

        observerRef.current.observe(ref.current);

        return () => {
            observerRef.current.disconnect();
        };
    }, [ref]);

    return isOnScreen;
}

export default useOnScreen;
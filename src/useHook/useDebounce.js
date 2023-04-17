import { useState, useEffect } from "react";
export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

const deb = (val, delay) => {
    const [value, setValue] = useState(val);
    useEffect(() => {
        const timer = setTimeout(() => {
            setValue(val);
        }, [delay]);
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);
    return value;
};

import { useState, useEffect } from 'react';

/**
 * useLocalStorage - A custom React hook for persistent state.
 *
 * Why this matters:
 * - Keeps state alive across browser refreshes (unlike useState alone).
 * - Centralises localStorage read/write logic so no component has to
 *   repeat the same try/catch boilerplate.
 * - Safe for SSR environments (checks typeof window before access).
 *
 * Usage:
 *   const [value, setValue] = useLocalStorage('my_key', defaultValue);
 *
 * @param {string} key       - The localStorage key to read / write.
 * @param {*}      initialValue - Default value when nothing is stored yet.
 * @returns {[*, Function]}  - [storedValue, setter]  (same API as useState)
 */
function useLocalStorage(key, initialValue) {
    // Lazily read from localStorage on first render
    const [storedValue, setStoredValue] = useState(() => {
        try {
            if (typeof window === 'undefined') return initialValue;
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`useLocalStorage: could not read key "${key}"`, error);
            return initialValue;
        }
    });

    // Whenever the stored value changes, write it back to localStorage
    useEffect(() => {
        try {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(storedValue));
            }
        } catch (error) {
            console.warn(`useLocalStorage: could not write key "${key}"`, error);
        }
    }, [key, storedValue]);

    /**
     * A setter that mirrors the useState API:
     * - Accepts a new value OR an updater function ((prev) => next).
     */
    const setValue = (value) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
        } catch (error) {
            console.warn(`useLocalStorage: setValue failed for key "${key}"`, error);
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage;

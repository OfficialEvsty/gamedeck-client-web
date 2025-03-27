
export const makeToken = () => {
    const length = 20;
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array); // Криптографически безопасно
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('').slice(0, length);
}
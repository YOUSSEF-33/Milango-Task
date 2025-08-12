export function formatDateYYYYMMDD(timestamp: number) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // zero-padded
    const day = String(date.getDate()).padStart(2, '0');        // zero-padded
    return `${year}-${month}-${day}`;
}
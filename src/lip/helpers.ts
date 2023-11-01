export const getArrayWithNumbers = (start: number, length: number) => {
    return Array.from({ length }, (_, i) => i + start);
}
export const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const updateSearchQuery = (queryStr: string, key: string, value: string) => {
    const query = new URLSearchParams(queryStr);
    query.set(key, value);

    return '?' + query.toString();
};
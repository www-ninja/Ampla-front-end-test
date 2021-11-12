export const saveDataToLocalStorage = (key, data) => {
    return window.localStorage.setItem(key, JSON.stringify(data));
}

export const getDataFromLocalStorage = (key) => {
    return window.localStorage.getItem(key);
}
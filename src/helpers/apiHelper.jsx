export const fetchDataFromServer = async (endpoint) => {
    const FULL_URL = import.meta.env.VITE_API_ENDPOINT + endpoint;
    const response = await fetch(FULL_URL);
    const formattedRes = await response.json();
    return formattedRes;
}
const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

/**********************GET REQUESTS**********************/
export const fetchDataFromServer = async (endpoint) => {
    const FULL_URL = BASE_URL + endpoint;
    const response = await fetch(FULL_URL);
    const formattedRes = await response.json();
    return formattedRes;
}
/**********************AUTH**********************/
export const registerUser = async (userData) => {
    const FULL_URL = BASE_URL + "/user/register";
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    };

    try {
        const response = await fetch(FULL_URL, requestOptions);
        const formattedRes = await response.json();
        if (!response.ok) {
            throw new Error(formattedRes.message || "An error occurred during registration");
        }

        return formattedRes;
    } catch (error) {
        console.error("Registration error:", error.message);
        throw error;
    }
};

export const loginUser = async (userData) => {
    const FULL_URL = BASE_URL + "/user/login"; 

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    };

    try {
        const response = await fetch(FULL_URL, requestOptions);

        const formattedRes = await response.json();

        if (!response.ok) {
            throw new Error(formattedRes.message || "An error occurred during login");
        }

        return formattedRes;
    } catch (error) {
        console.error("Login error:", error.message);
        throw error; 
    }
};


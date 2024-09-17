import axios from "axios";

let isLoggingOut = false

const setIsLoggingOut = (bool)=>{
    isLoggingOut = bool
}

const setupAxiosInterceptors = (navigate,dispatch) => {
    console.log(isLoggingOut)

    // Request interceptor for adding token
    console.log("setupAxiosInterceptors is runing")

    axios.interceptors.request.use(config => {
        const token = sessionStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    // Response interceptor for handling 401 errors
    axios.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response?.status === 401 && !isLoggingOut) {
          
            console.log("interceptors logout")
            isLoggingOut = true
            
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('id');
            sessionStorage.removeItem('name');

            dispatch({type: 'LOGOUT'})

            alert('Session expired. Please log in again.');
            navigate('/'); 
        }
        return Promise.reject(error);
    });
};

export {setupAxiosInterceptors, setIsLoggingOut};
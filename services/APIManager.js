import axios from "axios";


const APIManager = axios.create({
    baseURL: "https://f882-212-10-124-110.ngrok-free.app/api/",
    responseType: 'json',
    withCredentials: true,
});

export default APIManager;
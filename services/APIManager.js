import axios from "axios";


const APIManager = axios.create({
    baseURL: "https://93c8-212-10-123-68.ngrok-free.app/api/",
    responseType: 'json',
    withCredentials: true,
});

export default APIManager;
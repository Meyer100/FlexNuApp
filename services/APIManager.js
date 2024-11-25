import axios from "axios";


const APIManager = axios.create({
    baseURL: "https://5950-212-10-123-213.ngrok-free.app/api/",
    responseType: 'json',
    withCredentials: true,
});

export default APIManager;
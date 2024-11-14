import axios from "axios";


const APIManager = axios.create({
    baseURL: "https://a4db-37-75-161-47.ngrok-free.app/api/",
    responseType: 'json',
    withCredentials: true,
});

export default APIManager;
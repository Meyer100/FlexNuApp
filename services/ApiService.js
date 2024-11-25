import ApiManager from './APIManager'
import { getData } from './LocalStorageService';

export const userLogin = async data => {
    try {
       const result = await ApiManager(`/Account/Login?email=${encodeURIComponent(data.email)}&password=${encodeURIComponent(data.password)}`, {
           method: 'POST',
           headers: {
               'content-type': 'application/json'
           }
       });
       
       return result;
    }
    catch (error) {
        console.log("error");
        console.log(error);
    }
}


export const CheckUserInOut = async data => {
    try {
       const result = await ApiManager(`/User/CheckInOrOut?userId=${data}`, {
           method: 'GET',
           headers: {
               'content-type': 'application/json',
               'Authorization': `Bearer ${await getData()}`
           }
       });
       return result;
    }
    catch (error) {
        console.log("error");
        console.log(error);
    }
}


export const GetUserCurrentInfo = async data => {
    try {
       const result = await ApiManager(`/User/GetUserCurrentInfo?userId=${data}`, {
           method: 'GET',
           headers: {
               'content-type': 'application/json',
               'Authorization': `Bearer ${await getData()}`
           }
       });

       return result;
    }
    catch (error) {
        console.log("error");
        console.log(error);
    }
}

export const GetUserLogs = async (userId, month) => {
    try {
       const result = await ApiManager(`/User/GetUserLogs?userId=${userId}&month=${month}`, {
           method: 'GET',
           headers: {
               'content-type': 'application/json',
               'Authorization': `Bearer ${await getData()}`
           }
       });

       return result;
    }
    catch (error) {
        console.log("error");
       console.log(error);
    }
}

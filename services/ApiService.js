import ApiManager from './APIManager'
import { getData } from './LocalStorageService';

{/* This function calls the Login endpoint on the API to log in a user */}
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

{/* This function calls the CheckInOrOut endpoint on the API to either check in a user or check out a user */}
export const CheckUserInOut = async data => {
    try {
       const result = await ApiManager(`/User/CheckInOrOut?userId=${data}`, {
           method: 'POST',
           headers: {
               'content-type': 'application/json',
               'Authorization': `Bearer ${await getData()}`
           }
       });
       return result;
    }
    catch (error) {
        console.log(error);
    }
}

{/* This function calls the GetUserCurrentInfo endpoint on the API to get the users current info */}
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

{/* This function calls the GetUserLogs endpoint on the API to get the user logs for a specific month and year */}
export const GetUserLogs = async (userId, month, year) => {
    try {
       const result = await ApiManager(`/User/GetUserLogs?userId=${userId}&month=${month}&year=${year}`, {
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

export const GetAllUsersChat = async () => {
    try {
       const result = await ApiManager(`/Admin/GetUsers`, {
           method: 'GET',
           headers: {
               'content-type': 'application/json',
               'Authorization': `Bearer ${await getData()}`
           }
       });

       return result;
    }
    catch (error) {
       console.log('error: ' + error);
    }
}

export const GetChatsBetweenUsers = async (senderId, reciverId) => {
    try {
       const result = await ApiManager(`/Chat/GetMessagesBetweenPeople?senderId=${senderId}&reciverId=${reciverId}`, {
           method: 'GET',
           headers: {
               'content-type': 'application/json',
               'Authorization': `Bearer ${await getData()}`
           }
       });

       return result;
    }
    catch (error) {
       console.log('error: ' + error);
    }
}

export const SendChatToUser = async (message) => {
    try {
        const result = await ApiManager(`/Chat/AddMessage`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${await getData()}`
            },
            data: message,
        });
        
        return result;
     }
     catch (error) {
         console.log("error");
         console.log(error);
     }
}
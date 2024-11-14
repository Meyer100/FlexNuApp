import ApiManager from './APIManager'

export const userLogin = async data => {
    try {
       const result = await ApiManager(`/Account/Login?email=${encodeURIComponent(data.email)}&password=${encodeURIComponent(data.password)}`, {
           method: 'POST',
           headers: {
               'content-type': 'application/json'
           }
       });
       console.log(result.data.name);
       console.log(result.data.checkedIn);
       console.log(result.data.flexSeconds);
       return result;
    }
    catch (error) {
       console.log(error)
    }
}


export const getUserById = async data => {
    try {
       const result = await ApiManager(`?id=${data}`, {
           method: 'GET',
           headers: {
               'content-type':'application/json'
           },
           
       });
       return result;
    }
    catch (error) {
       console.log(error)
    }
}
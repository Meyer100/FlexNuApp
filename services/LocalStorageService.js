import AsyncStorage from '@react-native-async-storage/async-storage';

{/* This function saves the jwt token in local storage */}
export const storeData = async (value) => {
    console.log(value);
    try {
        const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('jwt_token', jsonValue);
    } catch (e) {
      console.log(e);
    }
};

{/* This function gets the jwt token from local storage */}
export const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('jwt_token');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      
    } catch (e) {
        console.log(e);
    }
};
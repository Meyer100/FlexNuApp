import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
    console.log(value);
    try {
        const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('jwt_token', jsonValue);
      console.log('saved!');
    } catch (e) {
      console.log(e);
    }
};


export const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('jwt_token');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      
    } catch (e) {
        console.log(e);
    }
};
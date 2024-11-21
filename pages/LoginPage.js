import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { useState } from "react"
import { userLogin } from '../services/ApiService';
import { storeData } from '../services/LocalStorageService';




const LoginPage = ({action}) => {
  const nav = useNavigation();
  const [email, setEmail] = useState("jobl@mail.dk");
  const [password, setPassword] = useState("12345");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [disableLogin, setDisableLogin] = useState(false);

  const logUserIn = async () => {
    setDisableLogin(true);
    if (email.length > 0 && password.length > 0) {
        try {
            const result = await userLogin({ email, password });
            if (result.status === 200) {
                action(result.data);
                await storeData(result.data.token);
                nav.replace('Home', { });
            } else {
              setShowErrorMessage(true);
            }
        } catch (error) {
            console.error(error);
            setShowErrorMessage(true);
        }
    } else {
      setShowErrorMessage(true);
    }
    setDisableLogin(false);
}

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titelText}>FlexNu</Text>
      </View>
      <View style={styles.loginContainer}> 
        <View>
          <Text>E-Mail</Text>
          <TextInput style={styles.loginInput} onChangeText={(s)=>setEmail(s)} textContentType='emailAddress' keyboardType="email-address" placeholder="mail@mail.dk"/>
        </View>
        <View>
          <Text>Adgangskode</Text>
          <TextInput style={styles.loginInput} secureTextEntry={true} onChangeText={(s)=>setPassword(s)} placeholder="kode123"/>
        </View>
        <View style={{opacity: (showErrorMessage == true) ? 1: 0}} >
          <Text style={{color:'red'}}>Fejl ved log ind</Text>
        </View>
        <View style={styles.loginButtonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={logUserIn} disabled={disableLogin}>
            <Text style={styles.loginButtonText}>Log ind</Text>
          </TouchableOpacity>
        </View>
      </View>
   

      
    </View>
  )
}

export default LoginPage

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop:75,
      padding:20,
      backgroundColor:'white',
    },
    titleContainer:{
      
      justifyContent: 'start',
      alignItems: 'center',
    },
    titelText:{
      fontSize:25,
    },
    loginContainer:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap:20,
    },
    loginInput:{
      height: 50,
      width:250,
      borderColor:'#5B95F8',
      borderWidth: 3,
      borderRadius:5,
    },
    loginButtonContainer:{
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection:'row',
    },
    loginButton:{
      height: 50,
      width: '100%',
      maxWidth:250,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:5,
      color:'white',
      backgroundColor:'#5B95F8',
      borderRadius:5,
    
    },
    loginButtonText:{
      color:'white',
      fontSize:16,
      fontWeight:'bold',
    }
})
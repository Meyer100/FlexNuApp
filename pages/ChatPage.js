import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { useEffect } from "react"


const LogPage = ({user}) => {
  const nav = useNavigation();
  

  useEffect(()=>{
    
  }, []);

  

  return (
        <View style={styles.container}>
            

        </View>
  )
}

export default LogPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:75,
        padding:20,
        backgroundColor:'white',
        gap:20,
    },
  
})
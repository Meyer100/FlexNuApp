import { SafeAreaView, FlatList, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { useState, useEffect } from "react"
import {GetUserLogs} from '../services/ApiService'


const LogPage = ({user}) => {
  const nav = useNavigation();
  const [logInfo, setLogInfo] = useState();

  useEffect(()=>{
    getLogInfo();
    
  }, []);

  

  const gotToHomePage =()=>{
    nav.replace('Home', { });
  }

  const getLogInfo = async ()=>{
    const result = await GetUserLogs(user.id, new Date().getMonth() + 1);
    
    if (result.status === 200) {
        setLogInfo(result.data);
    };
  }
  
  const dayInfoRender =({arrive, left, breakTime, dayFlex, date, reason})=>{
    if(reason == null){
      return(
        <View style={styles.dayInfoContainer}>
        <Text style={styles.dayInfoDate}>{date}</Text>
        <View style={styles.dayInfoBackground}>
          <View style={styles.dayInfoColumn}>
            <Text style={styles.dayInfoText}>Mødt: {arrive}</Text>
            <Text style={styles.dayInfoText}>Pause: {breakTime}</Text>
          </View>
          <View style={styles.dayInfoColumn}>
            <Text style={styles.dayInfoText}>Gået: {left}</Text>
            <Text style={styles.dayInfoText}>Flex {dayFlex}</Text>
          </View>
        </View>
      </View>
    );
  }else{
    return(
      <View style={styles.dayInfoContainer}>
      <Text style={styles.dayInfoDate}>{date}</Text>
      <View style={styles.dayInfoBackground}>
        <View style={styles.dayInfoColumn}>
          <Text style={styles.dayInfoText}>Væk: {reason}</Text>
        </View>
      </View>
    </View>
    );
    }
  }
  

  return (
        <View style={styles.container}>
            <View style={styles.backButtonContainer} >
                <TouchableOpacity onPress={gotToHomePage}>
                <Image style={styles.backIcon} source={require('../assets/icons/back.png')} />
                </TouchableOpacity>
            </View>
        
        
            <View style={styles.flatListContainer}>
                <FlatList
                data={logInfo}
                renderItem={({ item }) => (
                    dayInfoRender({
                    arrive: item.arrival,
                    left: item.left,
                    breakTime: item.break,
                    dayFlex: item.flex,
                    date: item.dateName,
                    reason: item.reason
                    })
                )}
                keyExtractor={(item, index) => index.toString()} // Ensure keys are unique
                />
            </View>

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
    backButtonContainer:{
        maxHeight:64,
        width:'100%',
    },
    backIcon:{
        height:35,
        aspectRatio:1,
    },
    dayInfoContainer:{
        width: '100%',
        maxWidth:250,
        margin:10,
      },
      dayInfoBackground:{
        backgroundColor:"#5B95F8",
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        borderRadius:3,
        width:'100%',
      },
      dayInfoColumn:{
        gap:15,
      },
      dayInfoDate:{
        opacity:0.6,
      },
      dayInfoText:{
        color:'white',
      },
      flatListContainer:{
        flex:1,
      },
})
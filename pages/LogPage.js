import { ScrollView, FlatList, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { useState, useEffect } from "react"
import {GetUserLogs} from '../services/ApiService'
import { TextInput } from 'react-native-gesture-handler';


const LogPage = ({user}) => {
  const nav = useNavigation();
  const [logInfo, setLogInfo] = useState();
  const [disableUpdate, setDisableUpdate] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear() + 1);
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  useEffect(()=>{
    getLogInfo();
    
  }, []);

  

  const gotToHomePage =()=>{
    nav.replace('Home', { });
  }

  const getLogInfo = async ()=>{
    setDisableUpdate(true);

    const result = await GetUserLogs(user.id, month);
    
    if (result.status === 200) {
        setLogInfo(result.data);
    };
    setDisableUpdate(false);

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
                <TouchableOpacity onPress={gotToHomePage} style={{flex:0.1}}>
                  <Image style={styles.backIcon} source={require('../assets/icons/back.png')} />
                </TouchableOpacity>
            </View>
          <View style={styles.pickerInputContainer}>
            
            <View >
              <Text>År</Text>
              <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
                <TextInput style={styles.pickerInput} keyboardType="numeric" onChangeText={(s)=>setYear(s)} placeholder={year.toString()}/>
              </ScrollView>
            </View>

            <View >
              <Text>Måned</Text>
              <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
                <TextInput style={styles.pickerInput} keyboardType="numeric" onChangeText={(s)=>setMonth(s)} placeholder={month.toString()}/>
              </ScrollView>
            </View>

            <View>
              <TouchableOpacity style={styles.goToLogsButton} onPress={getLogInfo} disabled={disableUpdate}>
                <Text style={styles.goToLogsButtonText}>Hent</Text>
              </TouchableOpacity>
            </View>
          </View>
        
          <Text>{disableUpdate == true ? "Loading..." : ""}</Text>


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
        marginBottom:25,
    },
    backIcon:{
        height:35,
        aspectRatio:1,
    },
    pickerInputContainer:{
      flexDirection:'row',
      gap:10,
      alignItems:'flex-end'
    },
    pickerInput:{
      height: 50,
      width:65,
      borderColor:'#5B95F8',
      borderWidth: 2,
      borderRadius:5,
    },
   
    goToLogsButton:{
      height: 50,
      width:65,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:5,
      color:'white',
      backgroundColor:'#5B95F8',
      borderRadius:5,
    },
    goToLogsButtonText:{
      color:'white',
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
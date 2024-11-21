import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {CheckUserInOut, GetUserCurrentInfo, GetMonthlyInfo} from '../services/ApiService'
import { useState,useEffect } from "react"

const HomePage = ({user}) => {

  const [todaysUserInfo, setTodaysUserInfo] = useState("");
  const [monthlyInfo, setMonthlyInfo] = useState();

    useEffect(()=>{
      getUserCurrentInfo();
      getMonthlyInfo();
    }, []);

    const formatSecondsToHHMM = (seconds) => {
      const hours = Math.floor(seconds / 3600); // Calculate hours
      const minutes = Math.floor((seconds % 3600) / 60); // Calculate remaining minutes
  
      // Format to two digits (e.g., 01:05)
      const formattedHours = String(hours).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
  
      return `${formattedHours}:${formattedMinutes}`;
  };

    const capitalizeName = (string) => {
      try {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      catch (error) {
        return string;
      }
    };

    const CheckInOut = async () => {
      const result = await CheckUserInOut(user.id);
        if (result.status === 200) {
          getUserCurrentInfo();
        };
    };

    const getUserCurrentInfo = async () => {
      const result = await GetUserCurrentInfo(user.id);
      if (result.status === 200) {
        setTodaysUserInfo(result.data);
      };
    }

    const getMonthlyInfo = async ()=>{
      const result = await GetMonthlyInfo(user.id, new Date().getMonth() + 1);
      if (result.status === 200) {
        setMonthlyInfo(result.data);
      };
    }

    const dayInfoRender =({arrive, left, breakTime, dayFlex, date})=>{
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
    }


  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.basicInfoContainer}>
          <Text style={styles.nameText}>{capitalizeName(user.name)} {capitalizeName(user.lastName)}</Text>
          <Text style={styles.smallText}>Status: {todaysUserInfo.userIsCheckedIn ? 'Mødt': 'Ikke mødt'}</Text>
          <Text style={styles.smallText}>Flex: {formatSecondsToHHMM(user.flexSeconds)}</Text>
        </View>

        <View style={styles.chatButtonContainer}>
          <TouchableOpacity >
            <Image style={styles.chatIcon} source={require('../assets/icons/chatbubble.png')} />
          </TouchableOpacity>
        </View>
      </View>
       
      
        <View style={styles.checkInOutButtonContainer}>
          <TouchableOpacity style={styles.checkInOutButton} onPress={CheckInOut}>
            <Text style={styles.checkInOutButtonText}>{todaysUserInfo.userIsCheckedIn ? 'Tjek ud': 'Tjek ind'}</Text>
          </TouchableOpacity>
        </View>
        
      <View style={styles.todayContainer}>
          <Text style={styles.dateText}>I dag</Text>
        <View style={styles.grid}>
          <View style={styles.infoBox}>
            <Text style={styles.title}>Mødt</Text>
            <Text style={styles.infoValue}>{todaysUserInfo.arrival}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.title}>Pause</Text>
            <Text style={styles.infoValue}>{todaysUserInfo.break}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.title}>Gået</Text>
            <Text style={styles.infoValue}>{todaysUserInfo.left}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.title}>Flex i dag</Text>
            <Text style={styles.infoValue}>{todaysUserInfo.flex}</Text>
          </View>
        </View>
      </View>

      <View style={styles.flatListContainer}>
        <FlatList
          data={monthlyInfo}
          renderItem={({ item }) => (
            dayInfoRender({
              arrive: item.arrival,
              left: item.left,
              breakTime: item.break,
              dayFlex: item.flex,
              date: item.dateName,
            })
          )}
          keyExtractor={(item, index) => index.toString()} // Ensure keys are unique
        />
      </View>
      

    </View>
  )
}
  
export default HomePage

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'start',
      alignItems: 'center',
      paddingTop:75,
      padding:20,
      backgroundColor:'white',
      gap:20,
  },
  topContainer:{
    width:'100%',
    height:'auto',
    justifyContent:'space-between',
    flexDirection:'row',
  },
  chatButtonContainer:{
    maxHeight:64,
  },
  chatIcon:{
    height:35,
    aspectRatio:1,
  },
  basicInfoContainer:{
  },
  nameText:{
      fontSize:28,
  },
  smallText:{
      fontSize:16,
      opacity:0.6,
  },
  checkInOutButtonContainer:{
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection:'row',
      marginTop:30,
    },
    checkInOutButton:{
      height: 90,
      width: '100%',
      maxWidth:250,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:5,
      color:'white',
      backgroundColor:'#5B95F8',
      borderRadius:5,
    },
    checkInOutButtonText:{
      color:'white',
      fontSize:32,
      fontWeight:'bold',
    },
    todayContainer: {
      flex: 1,
      paddingHorizontal: 35,
      paddingTop:15,
    },
    dateText: {
      fontSize: 16,
      opacity:0.6,
      marginBottom: 5,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    infoBox: {
      width: '48%',
      backgroundColor: '#5B95F8', // light blue color
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      color: '#fff',
      marginBottom: 5,
    },
    infoValue: {
      fontSize: 24,
      color: '#fff',
    },
    dayInfoContainer:{
      width: '100%',
      maxWidth:250,
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
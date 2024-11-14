import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

const HomePage = ({user}) => {

    const capitalizeName = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
      <View style={styles.container}>
        <View style={styles.basicInfoContainer}>
            <Text style={styles.nameText}>{capitalizeName(user.name)} {capitalizeName(user.name)}</Text>
            <Text style={styles.smallText}>Status: {user.checkedIn ? 'Mødt': 'Ikke mødt'}</Text>
            <Text style={styles.smallText}>Flex: {user.flexSeconds}</Text>
        </View>
      
        <View style={styles.checkInOutButtonContainer}>
          <TouchableOpacity style={styles.checkInOutButton}>
            <Text style={styles.checkInOutButtonText}>{user.checkedIn ? 'Tjek ud': 'Tjek ind'}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.todayContainer}>
      <Text style={styles.dateText}>I dag</Text>
      <View style={styles.grid}>
        <View style={styles.infoBox}>
          <Text style={styles.title}>Mødt</Text>
          <Text style={styles.infoValue}>07:57</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.title}>Pause</Text>
          <Text style={styles.infoValue}>28min</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.title}>Gået</Text>
          <Text style={styles.infoValue}>-</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.title}>Flex i dag</Text>
          <Text style={styles.infoValue}>-04:21</Text>
        </View>
      </View>
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
        marginTop:40,
      },
      checkInOutButton:{
        height: 100,
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
        padding: 35,
      },
      dateText: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10,
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
        paddingVertical: 20,
        paddingHorizontal: 10,
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
})
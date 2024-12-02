import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { useEffect } from "react"
import { connectToHub } from '../services/WebSocketService';
import UserSelect from '../components/chatpage/UserSelect';
import { GetAllUsersChat } from '../services/ApiService';


const ChatPage = ({user}) => {
  const [chatUsers, setChatUsers] = useState(null);
  
  const nav = useNavigation();
  
  useEffect(()=>{
    initializeChat();

  }, []);


  const initializeChat = async () => {
    try {
        // trying to connect to the hub
        const isConnected = await connectToHub(user.id);
        if (isConnected) {
          // Retrieving all users and filtering them based on if they are admins or not
            const result = await GetAllUsersChat();
            if(result.status == 200) {
              const filteredAdminUsers = result.data.filter(u => u.admin === true && u.id != user.id);
              setChatUsers(filteredAdminUsers);
            }
        } else {
            console.error('Failed to connect to the WebSocket hub');
        }
    } catch (error) {
        console.error('Error during WebSocket initialization:', error);
    }
  };

  const navigateToChatOneUserPage = (item) => {
    if (item) {
      nav.navigate('ChatOneUser', { chatUser: item }); // parsing a paramter through https://reactnavigation.org/docs/params/
    } else {
      console.error('Item is null or undefined');
    }
  };
  

  return (
        <View style={styles.container}>
          <Text style={styles.headerText}>Kontakt admin</Text>
          <FlatList
            data={chatUsers}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => navigateToChatOneUserPage(item)}>
                <UserSelect name={item.name + ' ' + item.lastName}/>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{gap: 15}}
          />
        </View>
  )
}

export default ChatPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:75,
        padding:20,
        backgroundColor:'white',
        gap:20,
    },
    headerText: {
      textAlign: 'center',
      fontSize: 28,
      fontWeight: 'bold',
    },
  
})
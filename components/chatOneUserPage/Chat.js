import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Chat = ({message, ownMessage}) => {

    const formatDate = (timestamp) => {
        // Parse the timestamp into a Date object
        const date = new Date(timestamp);
      
        // Extract the year, month, day, hours, and minutes
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        // Return the formatted date
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      };
      

  return (
    <View style={[styles.contaniner, {alignItems: ownMessage ? 'flex-end' : null}]}>
      <Text style={styles.name}>{ownMessage ? "dig" : message.newMessage ? message.sender.name : message.sender.name + ' ' + message.sender.lastName}</Text>
      <View style={[styles.chatBox, {backgroundColor: ownMessage ? '#5B95F8' : '#D9D9D9'}]}>
        <Text style={{color: ownMessage ? 'white' : null}}>{message.messageText}</Text>
      </View>
      <Text style={styles.dateText}>{formatDate(message.created)}</Text>
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
    contaniner: {
        flex: 1,
        alignItems: 'flex-end',
    },
    chatBox: {
        width: '50%',
        padding: 10,
        borderRadius: 5,
    },
    name: {
        fontSize: 12,
    },
    dateText: {
        color: 'grey',
        fontSize: 12,
    },
})
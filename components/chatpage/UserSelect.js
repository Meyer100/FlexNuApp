import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const UserSelect = ({name}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.userImg} source={require('../../assets/icons/user.png')}/>
      <Text>{name}</Text>
    </View>
  )
}

export default UserSelect

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 10,
        borderRadius: 5,
    },
    userImg: {
        height: 50,
        width: 50,
    },
})
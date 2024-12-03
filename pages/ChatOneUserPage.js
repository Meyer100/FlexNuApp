import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GetChatsBetweenUsers, SendChatToUser } from '../services/ApiService';
import Chat from '../components/chatOneUserPage/Chat';
import { connection, sendMessageToLobby } from '../services/WebSocketService';

const ChatOneUserPage = ({ route }) => {
    const { user, chatUser } = route.params || {};
    const [chats, setChats] = useState(null);
    const [textMessage, setTextMessage] = useState(null);

    useEffect(() => {
        getChats();

        // Registers a handler for when the specific hub method is invoked
        connection.on('ReciveMessage', reciveMessage);
    }, []);

    // Retrieving all chats between 2 users
    const getChats = async () => {
        const chatsResult = await GetChatsBetweenUsers(chatUser.id, user.id);
        // Checking for if the api call was successfull
        if (chatsResult.status === 200) {
            setChats(chatsResult.data);
        }
    };
    

    // Whenever the hub sends a reciveMessage event this method is called
    const reciveMessage = (data) => {
        // Updating the chats state, ...prevMessage is the previous array, next is the new item
        setChats((prevMessages) => [
          ...prevMessages,
          {
            id: data.id || 0, // Using `data.id` directly
            messageText: data.message, // Map `messageText` to `message`
            created: data.messageTime, // Map `created` to `messageTime`
            newMessage: true,
            sender: {
              id: data.senderId,
              name: data.senderName,
            }
          }
        ]);
      };

      // Func is called when a user clicks on the send button
      const sendMessage = async () => {
        if(textMessage) {
            // Creating a object that fits the requirements of the hub
            var obj = {
                id: 0,
                senderId: user.id,
                senderName: user.name + ' ' + user.lastName,
                reciverId: chatUser.id,
                message: textMessage,
                messageTime: new Date(),
            };
            // Trying to send the message
            await sendMessageToLobby(obj).then(async () => {
                // If successfull the message is getting stored on db
                const result = await SendChatToUser(obj);
                // if the message successfully is stored on db
                if(result.status == 200) {
                    // Remove user text, and dismiss the keyboard
                    setTextMessage(null);
                    Keyboard.dismiss();

                    // If the chats state is not null, it should pass in a new object, with previous objects
                    if(chats) {
                        setChats((prevMessages) => [
                            ...prevMessages,
                            {
                              id: 0,
                              messageText: obj.message,
                              created: obj.messageTime,
                              newMessage: true,
                              sender: {
                                id: obj.senderId,
                                name: obj.senderName,
                              }
                            }
                          ]);
                    }
                    else {
                        // If the state is null, we cannot pass previous objects due to them not existing
                        setChats([
                            {
                              id: 0,
                              messageText: obj.message,
                              created: obj.messageTime,
                              newMessage: true,
                              sender: {
                                id: obj.senderId,
                                name: obj.senderName,
                              },
                            },
                          ]);
                    }
                }

            });
        }
      }
        

    return (
        // KeyboardAvoidingView allows us to make the input field visible at all time https://reactnative.dev/docs/keyboardavoidingview
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // iOS uses padding; Android uses height
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.innerContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>
                            {chatUser ? chatUser.name + ' ' + chatUser.lastName : 'Fejl i navn'}
                        </Text>
                    </View>

                    <View style={styles.chatContainer}>
                        {chats ? 
                            <View style={{ flex: 1 }}>
                                <FlatList 
                                    data={chats}
                                    renderItem={({ item }) => (
                                        <Chat message={item} ownMessage={item.sender.id === user.id} />
                                    )}
                                    keyExtractor={(item) => item.created}
                                    contentInsetAdjustmentBehavior="automatic"
                                />
                            </View>

                        : <Text>Ingen beskeder endnu!</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput style={styles.chatInput} placeholder="Besked..." onChangeText={(text) => setTextMessage(text)} value={textMessage}/>
                        <TouchableOpacity style={styles.chatBtn} onPress={sendMessage}>
                            <Image style={styles.chatImage} source={require('../assets/icons/sendIcon.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default ChatOneUserPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        paddingTop: 75,
        padding: 20,
    },
    titleContainer: {
        alignItems: 'center',
    },
    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    chatContainer: {
        flex: 1, // Allow chat messages to expand
    },
    inputContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    chatInput: {
        height: 50,
        backgroundColor: '#D9D9D9',
        flex: 0.7,
        borderRadius: 5,
        padding: 10,
    },
    chatBtn: {
        height: 50,
        flex: 0.3,
        backgroundColor: '#D9D9D9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    chatImage: {
        height: 30,
        width: 30,
    },
});

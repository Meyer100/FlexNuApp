import { HubConnectionBuilder } from "@microsoft/signalr";

// Exporting for easy access
export const connection = new HubConnectionBuilder()
.withUrl('https://d5c7-37-75-161-47.ngrok-free.app/chathub')
.build();

export const connectToHub = async (userId) => {
    return connection.start()
        .then(() => {
            connection.invoke('UploadUserInfoAsync', userId)
            console.log('Connection started successfully');
            return true;
        })
        .catch(error => {
            console.error('Failed to start connection:', error);
            return false;
        });
};


export const sendMessageToLobby = async (data) => {
    try {
        connection.invoke('SendMessage', data);
    }
    catch(error) {

    }
}
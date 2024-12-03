import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { useState } from 'react';
import LogPage from './pages/LogPage';
import ChatPage from './pages/ChatPage';
import ChatOneUserPage from './pages/ChatOneUserPage';

export default function App() {
  const [user, setUser] = useState();
  const Stack = createStackNavigator();


  
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
      <Stack.Screen name="Login">
          {props=> <LoginPage action={(a)=> setUser(a)}/>}
        </Stack.Screen>
      <Stack.Screen name="Home"> 
          {props => <HomePage user={user}/>}
        </Stack.Screen>
        <Stack.Screen name="Logs"> 
          {props => <LogPage user={user}/>}
        </Stack.Screen>
        <Stack.Screen name="Chat"> 
          {props => <ChatPage user={user}/>}
        </Stack.Screen>
        <Stack.Screen
          name="ChatOneUser"
          component={ChatOneUserPage}
          initialParams={{ user: user }}
        />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

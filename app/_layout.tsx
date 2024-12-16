import { Text, View } from 'react-native'
import { Slot, useRouter, useSegments } from "expo-router";
import "../global.css"
import { AuthContextProvider, useAuth } from '../context/authContext';
import { useEffect, useReducer } from 'react';
import { MenuProvider } from 'react-native-popup-menu';

const MainLayout=()=>{
  const {isAuthenticated}= useAuth();
  const segment = useSegments();
  const router = useRouter();


  useEffect(()=>{
    //check if authenticated
    if(typeof isAuthenticated=='undefined') return;
    const inApp = segment[0]=='(app)'; // check if in app
    if(isAuthenticated && !inApp){
      //redirect to home
      router.replace('home')
    } else if(isAuthenticated == false){
      //redirect to login
      router.replace('signIn')
    }

  },[isAuthenticated])

  return <Slot /> // to use native wind in all
}

export default function RootLayout() {
    return (
      <MenuProvider>
        <AuthContextProvider>
          <MainLayout />
        </AuthContextProvider>
      </MenuProvider>
    )
}

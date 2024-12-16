import { Stack } from 'expo-router'
import { Text, View , Platform} from 'react-native'
import HomeHeader from '../../components/HomeHeader'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import Home from './home.js'
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Profile from './Profile.js';
import Trends from './Trends.js';
import Sleep from './Sleep.js';
import HeartModal from './HeartModal.js';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function _layout() {

    return (
        <Tab.Navigator 
        screenOptions={({route}) => ({
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
                height:60,
                elevation: 5,
                position: 'absolute',

            },
            tabBarShowLabel: true,
            headerShown: true,
        })}>

            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon:({focused})=>(
                        <View className=''
                        >
                        <Ionicons
                            name={focused ? 'home' : 'home-outline' }
                            size={30}
                            color={focused ? '#007bff' : '#c0c0c0'}
                        />
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name='Trends'
                component={Trends}
                options={{
                    tabBarIcon:({focused})=>(
                        <View className=''
                            style={{
                                
                            }}
                        >
                        <Ionicons
                            name={focused ? 'analytics' : 'analytics-outline'}
                            size={30}
                            color={focused ? '#007bff' : '#c0c0c0'}
                        />
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name='HeartModal'
                component={HeartModal}
                options={{
                    title:"",
                    tabBarIcon:({focused})=>(
                        <View  className=' bg-blue-500 rounded-full w-20 h-20 flex justify-center '
                        >
                        <Ionicons className=' left-4'
                            name='add'
                            size={40}
                            color={focused ? 'white' : 'white'}
                        />
                        </View>
                    )
                }}
            />


            <Tab.Screen
                name='Steps'
                component={Sleep}
                options={{
                    tabBarIcon:({focused})=>(
                        <View
                            style={{
                                
                            }}
                        >
                        <Ionicons
                            name={focused ? 'footsteps' : 'footsteps-outline'}
                            size={30}
                            color={focused ? '#007bff' : '#c0c0c0'}
                        />
                        </View>
                    )
                }}
            />


            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon:({focused})=>(
                        <View
                            style={{
                                
                            }}
                        >
                        <Ionicons
                            name={focused ? 'person' : 'person-outline'}
                            size={30}
                            color={focused ? '#007bff' : '#c0c0c0'}
                        />
                        </View>
                    )
                }}
            />




        </Tab.Navigator>
    )
    // <NavigationIndependentTree>
    //     <NavigationContainer>
    //     <Tab.Navigator   >
    //         <Tab.Screen
    //             name="home"
    //             component={Home}
    //             options={{tabBarIcon:()=>(
    //             <Feather name='home' color="black" size={25}/>
    //             )}}
    //         />
    //         {/* <Tab.Screen 
    //             name="Settings" 
    //             component={Med}
    //             options={{tabBarIcon:()=>(
    //             <Feather name='settings' color="black" size={25} />
    //             )}}
    //             /> */}
    //     </Tab.Navigator>
    //   </NavigationContainer>
    // </NavigationIndependentTree>
      
    
}

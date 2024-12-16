import React, { useRef, useState , useEffect} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
  Pressable
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { LineChart } from "react-native-chart-kit";
import { useAuth } from "../../context/authContext";

import HealthGraph from "../../components/HealthGraph";
import HomeHeader from '../../components/HomeHeader'
import { Image } from "expo-image";
import { blurhash } from '../../utils/common';
import BP_measure from '../../assets/images/BP_measure.png'
import Blood_sugar_measure from '../../assets/images/Blood_sugar_measure.png'
import Weight_measure from '../../assets/images/weight_measure.png'
import Step_counter from '../../assets/images/Step_counter.png'



// const chartConfig = {
//   backgroundGradientFrom: '#f3f4f6',
//   backgroundGradientTo: '#f3f4f6',
//   color: (opacity = 1) => `rgba(0, 50, 200, ${opacity})`,
//   labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//   strokeWidth: 2, // optional, default 3
//   barPercentage: 0.5,
//   propsForBackgroundLines: {
//     strokeWidth: 0, // Removes grid lines
//   },
// };

const screenWidth = (Dimensions.get('window').width)-20;


export default function Home() {

  const {user} = useAuth();

    return (
      <ScrollView className="flex-1 bg-neutral-100 p-4">

        <View className="bg-blue-500 p-3 rounded-2xl mb-3 elevation-md">
          <Text className="text-4xl pt-2 font-extrabold text-white">Good Evening, </Text>
          <Text className="text-2xl pl-2 text-neutral-100">{user?.username}</Text>
        </View>

        

        <View className="flex-row justify-between mb-4 ">
          <Pressable style={{width:wp(45), height:hp(18)}} className="bg-white rounded-2xl elevation-sm p-3">
            <Text className="text-xl font-extrabold">Blood Pressure</Text>
            <Text className="text-sm font-semibold text-neutral-400">Monitor heart health </Text>
            <Image
              style={{width:wp(22),aspectRatio: 1,}}
              source={BP_measure}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
          </Pressable>
          <Pressable style={{width:wp(45), height:hp(18)}} className="bg-white rounded-2xl elevation-sm p-3">
            <Text className="text-xl font-extrabold">Blood Sugar</Text>
            <Text className="text-sm font-semibold text-neutral-400">Track Glucose Levels </Text>
            <Image
              style={{width:wp(22),aspectRatio: 1,}}
              source={Blood_sugar_measure}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
          </Pressable>
        </View>
        <View className="flex-row justify-between mb-4">
          <Pressable style={{width:wp(45), height:hp(18)}} className="bg-white rounded-2xl elevation-sm p-3">
            <Text className="text-xl font-extrabold">Weight</Text>
            <Text className="text-sm font-semibold text-neutral-400">Keep check on weight </Text>
            <Image
              style={{width:wp(22),aspectRatio: 1,}}
              source={Weight_measure}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
          </Pressable>
          <Pressable style={{width:wp(45), height:hp(18)}} className="bg-white rounded-2xl elevation-sm p-3">
            <Text className="text-xl font-extrabold">Step Counter </Text>
            <Text className="text-sm font-semibold text-neutral-400">Exercise everyday </Text>
            <Image
              style={{width:wp(22),aspectRatio: 1,}}
              source={Step_counter}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
          </Pressable>
        </View>
        
      </ScrollView>
    )
}

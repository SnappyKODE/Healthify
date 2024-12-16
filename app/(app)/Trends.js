import React, { useRef, useState , useEffect} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { LineChart } from "react-native-chart-kit";
import { useAuth } from "../../context/authContext";

import HealthGraph from "../../components/HealthGraph";
import HomeHeader from '../../components/HomeHeader'

const screenWidth = (Dimensions.get('window').width)-20;

export default function Trends(){
    return(
        <ScrollView className="p-4 bg-neutral-100">
            <HealthGraph />
            <HealthGraph />
        </ScrollView>
    )
}
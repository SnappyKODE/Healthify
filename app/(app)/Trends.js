import React, { useRef, useState , useEffect} from "react";
import {
    View,
    ScrollView
} from "react-native";
import HealthGraph from "../../components/HealthGraph";

export default function Trends(){
    return(
        <ScrollView className="p-4  bg-neutral-100">
            <HealthGraph title='Weight' unit='kg'/>
            <HealthGraph title='Blood Pressure' unit='mmHg'/>
            <HealthGraph title='Blood Sugar' unit='mmol/L'/>
            <View className="p-10"></View>
        </ScrollView>
    )
}
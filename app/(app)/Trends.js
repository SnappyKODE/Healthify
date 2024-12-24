import React, { useRef, useState , useEffect} from "react";
import {
    View,
    ScrollView,
    RefreshControl
} from "react-native";
import HealthGraph from "../../components/HealthGraph";

export default function Trends(){

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      };

    return(
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} 
              onRefresh={onRefresh} />
          } className="p-4  bg-neutral-100">
            <HealthGraph title='Weight' unit='kg' type="W"/>
            <HealthGraph title='Blood Pressure' unit='mmHg' type="BP"/>
            <HealthGraph title='Blood Sugar' unit='mg/DL' type="BS"/>
            <View className="p-10"></View>
        </ScrollView>
    )
}
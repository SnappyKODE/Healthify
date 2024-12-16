import React, { useRef, useState , useEffect} from "react";
import {
  View,
  Text,
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { LineChart } from "react-native-chart-kit";
import { useAuth } from "../context/authContext";

const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 80, 200, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    decimalPlaces: 2,
    propsForBackgroundLines: {
      strokeWidth: 1,
    },
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "3",
      strokeWidth: "2",
    },
    propsForVerticalLabels:{
      fontSize: "10",
      fontWeight: "bold"
    },
    propsForHorizontalLabels:{
      fontSize: "12",
      fontWeight: "bold"
    }
  };


export default function HealthGraph({title, unit, type}){
    const {weightsInput, user, getWeights,getSugar , SugarInput,getPressure} = useAuth()
    const WeightInputRef = useRef("")
    const SugarInputRef = useRef("")

    var date = new Date().getDate(); 
    var month = new Date().getMonth() + 1;
  
    const [weightData, setWeightData] = useState([])
    const [SugarData, setSugarData] = useState([])
    const [PressureData, setPressureData] = useState([])

    const [wdata, setWData] = useState({
      labels: [{ data : [date]}],
      datasets: [{ data: [0] }],
    });
    // const [sdata, setSData] = useState({
    //   labels: [{ data : [date]}],
    //   datasets: [{ data: [0] }],
    // });

    useEffect(() => {
        const fetchWeightData = async () => {
          const userId = user?.userId; // Replace with how you get the user ID
          if(type == 'W'){
            const {wdate, w} = await getWeights(userId);
            setWeightData(w); 
            setWData({
            labels: wdate,
            datasets: [{
              label: 'Weight', // Add a label for the dataset
              data: w, // Directly use the wd array for data
            }],
            });
          } else if(type == 'BS') {
            const {sugardate, sugar} = await getSugar(userId);
            setSugarData(sugar); 
            setWData({
            labels: sugardate,
            datasets: [{
              label: 'Blood Sugar', // Add a label for the dataset
              data: sugar, // Directly use the wd array for data
            }],
            });
          }else if(type == 'BP'){
            const {pressuredate, pressure} = await getPressure(userId);
            setPressureData(pressure); 
            setWData({
            labels: pressuredate,
            datasets: [{
              label: 'Blood Pressure', // Add a label for the dataset
              data: pressure, // Directly use the wd array for data
            }],
            });
          }else{

          }
          
        };
        fetchWeightData(); // Call the function to fetch data on mount
    }, );


    return(
        <View className="bg-white p-4 rounded-2xl mb-3 elevation-sm">
          <Text className="font-bold text-2xl">{title}</Text>
          <Text className="font-semibold text-sm - text-neutral-500">Unit: {unit}</Text>
          <View className="my-4 flex justify-center items-center">
            <LineChart 
              data={wdata}
              width={wp(90)}
              height={230}
              chartConfig={chartConfig}
              bezier
              xLabelsOffset={5}
              yLabelsOffset={20}
              segments={4}
              withInnerLines={false}
              className=""
              fromZero={true}
            />
          </View>
        </View>
        
    )
}
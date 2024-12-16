import React, { useRef, useState , useEffect} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  Button,
  ScrollView
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { LineChart } from "react-native-chart-kit";
import { useAuth } from "../context/authContext";
import { Ionicons } from "@expo/vector-icons";


const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 80, 200, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    decimalPlaces: 2,
    propsForBackgroundLines: {
      strokeWidth: 1, // Removes grid lines
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


export default function HealthGraph(){
    const {weightsInput, user, getWeights} = useAuth()
    const WeightInputRef = useRef("")
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month

  
    const [weightData, setWeightData] = useState([])
      const [data, setData] = useState({
        labels: [{ data : [date]}],
        datasets: [{ data: [0] }],
      });

    useEffect(() => {
        const fetchWeightData = async () => {
          const userId = user?.userId; // Replace with how you get the user ID
          const {wdate, w} = await getWeights(userId);
          setWeightData(w); 
          setData({
            labels: wdate,
            datasets: [{
              label: 'Weight', // Add a label for the dataset
              data: w, // Directly use the wd array for data
            }],
          });
        };
        fetchWeightData(); // Call the function to fetch data on mount
    }, );


    // const handleInput = async()=>{
    //   let value = {
    //     date : date,
    //     weight : 42
    //   }
    //   let response = await weightsInput(value, user?.userId)
    // }
    
      const handleInput = async()=>{
        
        if(!WeightInputRef.current ){
          Alert.alert("Weight Input", "Please fill the field");
          return;
        } else if( WeightInputRef.current > 200){
          Alert.alert("Weight Input", "Please fill valid weight");
          return;
        }

        let value = {
          date : `${date}/${month}`,
          weight : WeightInputRef.current
        }
    
        let response = await weightsInput(value, user?.userId)
        console.log(response)
        if(!response.success){
          Alert.alert('Weight Input', response.msg)
        }
    
        let {wdate, w}= await getWeights(user?.userId)
        console.log(wd)
    
        setData({
          labels: wdate,
          datasets: [{
            label: 'Weight', // Add a label for the dataset
            data: w, // Directly use the wd array for data
          }],
        });
        
    
      }


    return(
        <View className="bg-white p-4 rounded-2xl mb-3 elevation-sm">
          <Text className="font-bold text-2xl">Weight</Text>
          <Text className="font-semibold text-sm - text-neutral-500">Unit: kg</Text>
          <View className="my-4 flex justify-center items-center">
            <LineChart 
              data={data}
              width={wp(90)}
              height={230}
              chartConfig={chartConfig}
              bezier
              // yAxisSuffix=" KG"
              // verticalLabelRotation={-65}
              xLabelsOffset={5}
              yLabelsOffset={20}
              segments={4}
              withInnerLines={false}
              className=""
            />
          </View>
          {/* <View className="border rounded-2xl p-2 bg-white">
            <TextInput
              onChangeText={(value)=>{ WeightInputRef.current = value;}}
              keyboardType="numeric"
              placeholderTextColor='gray'
              placeholder="Weight in Kg"/>
          </View> */}
          <TouchableOpacity onPress={handleInput} className="bg-blue-500 py-3 rounded-full flex-row items-center justify-center">
            <Ionicons name="add" size={hp(2.2)} color={'white'}/>
            <Text style={{fontSize: hp(2.2)}} className="text-white ml-1">Add </Text>
          </TouchableOpacity>
        </View>
        
    )
}
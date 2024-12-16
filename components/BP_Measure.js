import {View, Text, Pressable,TextInput , TouchableOpacity} from 'react-native'
import { useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import HealthGraph from './HealthGraph';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useAuth } from "../context/authContext";

export default function BP_Measure({onClose}){

    const {PressureInput, user, getPressure} = useAuth()
        const PressureInputRef = useRef("")
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
      
        const [pressureData, setpressureData] = useState([])
          const [data, setData] = useState({
            labels: [{ data : [date]}],
            datasets: [{ data: [0] }],
          });

      const handleInput = async()=>{
            
            if(!PressureInputRef.current ){
              Alert.alert("Blood Pressure Input", "Please fill the field");
              return;
            } else if( PressureInputRef.current > 200){
              Alert.alert("Blood Pressure Input", "Please fill valid weight");
              return;
            }
    
            let value = {
              date : `${date}/${month}`,
              pressure : PressureInputRef.current
            }
        
            let response = await PressureInput(value, user?.userId)
            console.log(response)
            if(!response.success){
              Alert.alert('Blood Pressure Input', response.msg)
            }
        
            let {pressuredate, pressure}= await getPressure(user?.userId)
            console.log(pressuredate)
        
            setData({
              labels: pressuredate,
              datasets: [{
                label: 'Blood Pressure', // Add a label for the dataset
                data: pressure, // Directly use the wd array for data
              }],
            });
            
          }

    return(
        <View className='flex-1 bg-neutral-100 p-4'>
            <Pressable className='flex items-end w-full ' onPress={() => onClose()}>
                <Ionicons name='close' size={35}/>
            </Pressable>
            <View className='bg-white p-4 rounded-xl mb-4 mt-2 elevation-sm'>
                <Text className="font-bold text-2xl">Blood Pressure Input</Text>
                <Text className="font-semibold text-sm - text-neutral-500 mb-4">Unit: mmHg</Text>
                <View className="border rounded-2xl p-2 bg-white">
                  <TextInput
                    onChangeText={(value)=>{ PressureInputRef.current = value;}}
                    keyboardType="numeric"
                    placeholderTextColor='gray'
                    placeholder="BP in mmHg"/>
                </View>
                <TouchableOpacity onPress={handleInput} className="bg-blue-500 py-3 mt-3 rounded-full flex-row items-center justify-center">
                  <Ionicons name="add" size={hp(2.2)} color={'white'}/>
                  <Text style={{fontSize: hp(2.2)}} className="text-white ml-1">Add </Text>
                </TouchableOpacity>
            </View>
            <HealthGraph title='Blood Pressure' unit='mmHg' type="BP"/>
        </View>
    )
}
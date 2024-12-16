import {View, Text, Pressable,TextInput , TouchableOpacity} from 'react-native'
import { useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import HealthGraph from './HealthGraph';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useAuth } from "../context/authContext";

export default function Height_Measure({onClose}){

    const {weightsInput, user, getWeights} = useAuth()
        const WeightInputRef = useRef("")
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
    
        const [weightData, setWeightData] = useState([])
          const [wdata, setWData] = useState({
            labels: [{ data : [date]}],
            datasets: [{ data: [0] }],
          });

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

            setWData({
              labels: wdate,
              datasets: [{
                label: 'Weight', // Add a label for the dataset
                data: w, // Directly use the wd array for data
              }],
            });
          }

    return(
        <View className='flex-1 bg-neutral-100 p-4'>
            <Pressable className='flex items-end w-full ' onPress={() => onClose()}>
              <Ionicons name='close' size={35}/>
            </Pressable>
            <View className='bg-white p-4 rounded-xl mb-4 mt-2 elevation-sm'>
              <Text className="font-bold text-2xl">Weight Input</Text>
              <Text className="font-semibold text-sm - text-neutral-500 mb-4">Unit: kg</Text>
              <View className="border rounded-2xl p-2 bg-white">
                <TextInput
                  onChangeText={(value)=>{ WeightInputRef.current = value;}}
                  keyboardType="numeric"
                  placeholderTextColor='gray'
                  placeholder="Weight in Kg"/>
              </View>
              <TouchableOpacity onPress={handleInput} className="bg-blue-500 py-3 mt-3 rounded-full flex-row items-center justify-center">
                <Ionicons name="add" size={hp(2.2)} color={'white'}/>
                <Text style={{fontSize: hp(2.2)}} className="text-white ml-1">Add </Text>
              </TouchableOpacity>
            </View>
            <HealthGraph title='Weight' unit='kg' type="W"/>
        </View>
    )
}
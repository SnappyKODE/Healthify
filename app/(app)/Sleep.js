import { useState, useEffect, useRef } from 'react';
import { Text, View , Pressable} from 'react-native';;
import { Accelerometer } from 'expo-sensors';
import { ProgressChart } from 'react-native-chart-kit';
import { useAuth } from "../../context/authContext";
import { Ionicons } from '@expo/vector-icons';
import { Image } from "expo-image";
import { blurhash } from '../../utils/common';
import walk from '../../assets/images/Running.png'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Sleep({onClose, modal}){

    const [steps, setSteps] = useState(0)
    const [isCounting, setIsCounting] = useState(false)
    const [lastY, setLastY] = useState(0)
    const [lastTimestamp, setLastTimestamp]= useState(0)
    const [stepTarget, setStepTarget] = useState(100)
    const {user, setStep , getStep} = useAuth()
    

    const chartConfig = {
        backgroundGradientFrom: "#ffffff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#ffffff",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0, 100, 225, ${opacity})`,
      };

      const fetchStepData = async () => {
        const userId = user?.userId; // Replace with how you get the user ID
        const sdata = await getStep(userId);
        // setSteps(w)
        // console.log(sdata)
      };



    useEffect(()=>{
        let subs
        Accelerometer.isAvailableAsync().then((result)=>{
            if(result){
                subs = Accelerometer.addListener((accelerometerData)=>{
                    const {y} = accelerometerData
                    const theshold = 0.2
                    const timestamp = new Date().getTime();
                    // fetchStepData()
                    // if(steps < 2){
                    //     setSteps(sdata)
                    // }
                    
                    if(Math.abs(y-lastY) > theshold && !isCounting && (timestamp - lastTimestamp > 800)){

                        
                        setIsCounting(true)
                        setLastY(y)
                        setLastTimestamp(timestamp)
                        setSteps((prev)=>prev+1)
                        // let response = setStep(steps,user?.userId)
                        // console.log(response)
                        let response = setStep(steps+1, user?.userId)

                        setTimeout(()=>{
                            setIsCounting(false)
                        },1200)
                    }
                })
            } else {
                console.log("accelometer not aailabke")
            }
        })
        return ()=>{
            subs.remove();
            fetchStepData();
        }
    },[isCounting ,lastY ,lastTimestamp])

    const resetSteps =() =>{
        setSteps(0)
    }

    return(
        <View className='flex-1 items-center bg-neutral-100 p-4'>

            {
                modal && (
                    <Pressable className='flex items-end w-full py-3' onPress={() => onClose()}>
                        <Ionicons name='close' size={35}/>
                    </Pressable>
                )
            }

            <View className='bg-white items-center p-3 w-full rounded-xl elevation-md'>
                <Text className='text-xl py-4'>You have walked {steps} steps today. </Text>
                <ProgressChart
                    data={{labels:[],data:[steps/stepTarget]}}
                    chartConfig={chartConfig}
                    width={220}
                    height={220}
                    strokeWidth={30}
                    radius={80}
                    hideLegend={true}
                />
            </View>
            <View className='flex-row mt-4 justify-between'>
                <View className='bg-white items-center p-2 mr-4 w-48 rounded-xl elevation-md'>
                    <Text className='border-b-2 text-lg font-bold text-neutral-500 border-x-neutral-500 mb-3'>Today's Steps </Text>
                    <Text className='text-xl font-extrabold mb-2'>{steps}</Text>
                </View>
                <View className='bg-white items-center p-2 w-48 rounded-xl elevation-md'>
                    <Text className='border-b-2 text-lg font-bold text-neutral-500 border-x-neutral-500 mb-3'>Daily Target </Text>
                    <Text  className='text-xl font-extrabold mb-2'>{stepTarget}</Text>
                </View>
            </View>
            <View className='flex-row mt-4 justify-between'>
                <View className='bg-white items-center p-2 mr-4 w-48 rounded-xl elevation-md'>
                    <Text className='border-b-2 text-lg font-bold text-neutral-500 border-x-neutral-500 mb-3'>Calories(in cal) </Text>
                    <Text  className='text-xl font-extrabold mb-2'>{(steps * 0.05).toFixed(2) }</Text>
                </View>
                <View className='bg-white items-center p-2 w-48 rounded-xl elevation-md'>
                    <Text className='border-b-2 text-lg font-bold text-neutral-500 border-x-neutral-500 mb-3'>Distance(in m) </Text>
                    <Text className='text-xl font-extrabold mb-2'> {(steps * 0.76).toFixed(2)}</Text>
                </View>
            </View>
            
            {
                !modal && (
                    <View className='-mt-10'>
                    <Image
                            style={{width:wp(65),aspectRatio: 1,}}
                            
                            source={walk}
                            placeholder={{ blurhash }}
                            contentFit="cover"
                            transition={1000}
                        />
                        </View>
                )
            }
            
        </View>
    )
}

import React, { useState , useEffect} from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Modal
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useAuth } from "../../context/authContext";
import BP_measure from '../../assets/images/BP_measure.png'
import Blood_sugar_measure from '../../assets/images/Blood_sugar_measure.png'
import Weight_measure from '../../assets/images/weight_measure.png'
import Step_counter from '../../assets/images/Step_counter.png'
import Home_Block from "../../components/ui/Home_Block";
import Height_Measure from "../../components/Height_Measure";
import BP_Measure from '../../components/BP_Measure'
import BS_Measure from '../../components/BS_Measure'
import Sleep from './Sleep'
import { Image } from "expo-image";
import { blurhash } from '../../utils/common';
import Bottom_img from '../../assets/images/bt.png'


export default function Home() {

  const {user} = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [mtype, setMtype] = useState()

  const handleClose = ()=>{
    setModalVisible(!modalVisible);
  }
  const handleOpen =(type)=>{
    setModalVisible(true)
    setMtype(type)
  }

    return (
      <ScrollView className="flex-1 bg-neutral-100 p-4">

        <View className="bg-blue-500 p-3 rounded-2xl mb-3 elevation-md">
          <Text className="text-4xl pt-2 font-extrabold text-white">Good Evening, </Text>
          <Text className="text-2xl pl-2 text-neutral-100">{user?.username}</Text>
        </View>

        <View className="flex-row justify-between mb-4 ">
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          >
            {
              mtype == "BP" ? 
              <BP_Measure  onClose={handleClose}/> : mtype == 'BS' ? 
              <BS_Measure onClose={handleClose}/> : mtype == 'W' ? 
              <Height_Measure onClose={handleClose}/> : <Sleep onClose={handleClose} modal="true"/>
            }
        </Modal>
        
        <Pressable  onPress={() => handleOpen("BP")}>
          <Home_Block img={BP_measure} title="Blood Pressure" content="Monitor heart health" />
        </Pressable>

        <Pressable onPress={() => handleOpen("BS")}>
          <Home_Block img={Blood_sugar_measure} title="Blood Sugar" content="Track Glucose Levels" />
        </Pressable>

        </View>

        <View className="flex-row justify-between mb-4 ">
          <Pressable  onPress={() => handleOpen("W")}>
            <Home_Block img={Weight_measure} title="Weight" content="Keep check on weight" />
          </Pressable>
          
          <Pressable onPress={() => handleOpen("S")}>
            <Home_Block img={Step_counter} title="Step Counter" content="Exercise everyday" />
          </Pressable>
          
        </View>

        <View className="flex justify-center items-center ">
        <Image
                style={{width:wp(84),aspectRatio: 1,}}
                source={Bottom_img}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
            />
        </View>

      </ScrollView>
    )
}

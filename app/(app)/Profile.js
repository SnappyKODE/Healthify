import {View, Text, ScrollView, Pressable, Modal} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import Female from '../../assets/images/male-avatar.svg'
import { blurhash } from '../../utils/common';
import {useAuth} from '../../context/authContext'
import { useState } from 'react';
import Edit from '../../components/profile/Edit';
import Notif from '../../components/profile/Notif';
import Security from '../../components/profile/Security';
import Help from '../../components/profile/Help';
import About from '../../components/profile/About';
import Policy from '../../components/profile/Policy';

export default function Profile(){

    const {user, logout}= useAuth();
     const [modalVisible, setModalVisible] = useState(false);
     const [mtype, setMtype] = useState()

    const handleLogout = async ()=>{
        await logout();
    }

    const handleClose = ()=>{
        setModalVisible(!modalVisible);
      }
      const handleOpen =(type)=>{
        setModalVisible(true)
        setMtype(type)
      }

    return(
        <ScrollView className='flex-1 bg-neutral-100 px-2'>
            <View className='flex justify-center items-center py-10'>
                <View style={{height:hp(15),width:hp(15)}} className=" bg-white rounded-full mb-3">
                    <Image
                        style={{ aspectRatio: 1, borderRadius: 100 , borderWidth: 3, borderColor:"#3b82f6"}}
                        source={Female}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                    />
                </View>
                <Text className='text-3xl mb-2 text-neutral-800'>{user?.username} </Text>
                <Text className='text-base text-neutral-500'>{user?.email} </Text>
            </View>

            <View className='flex-1 bg-neutral-100 px-2'>

                <Pressable className='bg-white px-3 py-4  rounded-2xl mb-3 flex-row gap-4 justify-between' onPress={() => handleOpen("E")}>
                    <View className='flex-row gap-4 items-center'>
                        <Ionicons name='create-outline' size={hp(3)} /> 
                        <Text className=''>Edit Profile </Text>
                    </View>
                    <Ionicons name='chevron-forward-outline' size={hp(3)} className=''/> 
                </Pressable>
                <Pressable className='bg-white px-3 py-4  rounded-2xl mb-3 flex-row gap-4 justify-between' onPress={() => handleOpen("N")}>
                    <View className='flex-row gap-4 items-center'>
                        <Ionicons name='notifications-outline' size={hp(3)} /> 
                        <Text className=''>Notifications </Text>
                    </View>
                    <Ionicons name='chevron-forward-outline' size={hp(3)} className=''/> 
                </Pressable>
                <Pressable className='bg-white px-3 py-4  rounded-2xl mb-3 flex-row gap-4 justify-between' onPress={() => handleOpen("S")}>
                    <View className='flex-row gap-4 items-center'>
                        <Ionicons name='shield-checkmark-outline' size={hp(3)} /> 
                        <Text className=''>Security </Text>
                    </View>
                    <Ionicons name='chevron-forward-outline' size={hp(3)} className=''/> 
                </Pressable>
                <Pressable className='bg-white px-3 py-4  rounded-2xl mb-3 flex-row gap-4 justify-between' onPress={() => handleOpen("H")}>
                    <View className='flex-row gap-4 items-center'>
                        <Ionicons name='help-circle-outline' size={hp(3)} /> 
                        <Text className=''>Help </Text>
                    </View>
                    <Ionicons name='chevron-forward-outline' size={hp(3)} className=''/> 
                </Pressable>
                <Pressable className='bg-red-100 px-3 py-4  rounded-2xl mb-3 flex-row gap-4 justify-between' onPress={()=>{handleLogout()}}>
                    <View className='flex-row gap-4 items-center'>
                        <Ionicons name='log-out-outline' size={hp(3)} color="#f87171"/> 
                        <Text className='text-red-400'>Logout </Text>
                    </View>
                </Pressable>

            </View>

            <View className='flex-1 bg-neutral-100 px-2'>
                <Text className='text-neutral-600 py-4 px-2'>About</Text>
                <Pressable className='bg-white px-3 py-4  rounded-2xl mb-3 flex-row gap-4 justify-between' onPress={() => handleOpen("A")}>
                    <View  className='flex-row gap-4 items-center'>
                        <Ionicons name='bug-outline' size={hp(3)} /> 
                        <Text className=''>About Dev </Text>
                    </View>
                    <Ionicons name='chevron-forward-outline' size={hp(3)} className=''/> 
                </Pressable>
                <Pressable className='bg-white px-3 py-4  rounded-2xl mb-3 flex-row gap-4 justify-between' onPress={() => handleOpen("P")}>
                    <View className='flex-row gap-4 items-center'>
                        <Ionicons name='lock-closed-outline' size={hp(3)} /> 
                        <Text className=''>Privacy Policy </Text>
                    </View>
                    <Ionicons name='chevron-forward-outline' size={hp(3)} className=' '/> 
                </Pressable>
                <Pressable className='bg-white px-3 py-4  rounded-2xl mb-24 flex-row gap-4 justify-between'>
                    <View className='flex-row gap-4 items-center'>
                        <Ionicons name='information-circle-outline' size={hp(3)} /> 
                        <Text className=''>Version </Text>
                    </View>
                    <Text className='text-center'>~ 1.0.1.2 </Text>
                </Pressable>
            </View>


            <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
            >
            {
                mtype == "E" ? 
                <Edit/> : mtype == 'N' ? 
                <Notif /> : mtype == 'S' ? 
                <Security /> : mtype == 'H' ?
                <Help/> :mtype =='A' ?
                <About /> : <Policy />
            }
        </Modal>
        </ScrollView>
        
    )
}
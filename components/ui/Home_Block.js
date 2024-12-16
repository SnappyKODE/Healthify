import {View, Text, Pressable } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { blurhash } from '../../utils/common';
import { Image } from "expo-image";

export default function Home_Block({title,content,img}){
    return(
        <View style={{width:wp(45), height:hp(18)}} className="bg-white rounded-2xl elevation-sm p-3">
            <Text className="text-xl font-extrabold">{title} </Text>
            <Text className="text-sm font-semibold text-neutral-400">{content} </Text>
            <Image
                style={{width:wp(22),aspectRatio: 1,}}
                source={img}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
            />
        </View>
    )
}
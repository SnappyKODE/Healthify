import { View } from 'react-native'
import Loading from '../components/Loading'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



export default function StartPage() {

    return (
      <View className="flex-1 justify-center items-center">
        <Loading size={hp(25)}/>
      </View>
    )
}

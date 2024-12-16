import { ActivityIndicator, Text, View } from 'react-native'
import Loading from '../components/Loading'

export default function StartPage() {

    return (
      <View className="flex-1 justify-center items-center">
        <Loading />
      </View>
    )
}

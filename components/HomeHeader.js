import { StatusBar } from 'expo-status-bar';
import { Platform, Text, View } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import {useAuth} from '../context/authContext'
import { blurhash } from '../utils/common';
import {
    Menu,
    MenuOptions,
    MenuTrigger,
  } from 'react-native-popup-menu';
import { MenuItems } from './CustomMenuItems';
import { Feather, MaterialIcons } from '@expo/vector-icons';


const ios = Platform.OS == 'ios'

export default function HomeHeader() {

    const {user, logout}= useAuth();

    const {top} = useSafeAreaInsets()
    const handleProfile =()=>{

    }

    const handleLogout = async ()=>{
        await logout();
    }

    return (
        <View style={{paddingTop: ios?top:top+10}} className="flex-row justify-between px-5 bg-blue-500 pb-6 rounded-b-3xl shadow">
            <StatusBar className="bg-blue-500"></StatusBar>
            <View>
                <Text  style={{fontSize: hp(3)}} className="font-medium text-white ">Home</Text>
            </View>
            <View>
            <Menu>
                <MenuTrigger>
                    <Image
                        style={{height:hp(4.3), aspectRatio: 1, borderRadius: 100}}
                        source={user?.profileUrl}
                        placeholder={blurhash}
                        transition={500}
                    />
                </MenuTrigger>
                <MenuOptions
                    customStyles={{
                        optionsContainer:{
                            borderRadius: 10,
                            borderCurve: "continuous",
                            marginTop: 40,
                            marginLeft: -20,
                            backgroundColor: "white"
                        }
                    }}
                >
                    <MenuItems 
                        text="Profile"
                        action={handleProfile}
                        value={null}
                        icon={<Feather name='user' color="#373737" size={hp(2.5)} />}
                    />
                    <View className='p-[1px] w-full bg-neutral-200'></View>
                    <MenuItems 
                        text="Logout"
                        action={handleLogout}
                        value={null}
                        icon={<MaterialIcons name='logout' color="#373737" size={hp(2.5)} />}
                    />
                </MenuOptions>
            </Menu>
            </View>
        </View>
    )
}

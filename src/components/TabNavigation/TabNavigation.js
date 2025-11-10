import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import HomeMenu from '../HomeMenu/HomeMenu';
import Perfil from '../../screens/Perfil/Perfil';
import CrearPosteo from '../../screens/CrearPosteo/CrearPosteo';




const Tab = createBottomTabNavigator()

function TabNavigation(props) {
    return (
        <Tab.Navigator>
            <Tab.Screen name="HomeMenu" component={HomeMenu} options={{ headerShown: false, tabBarIcon: () => <FontAwesome5 name="home" size={24} color="black" /> }} />
            <Tab.Screen name="CrearPosteo" component={CrearPosteo} options={{ headerShown: false, tabBarIcon: () => <FontAwesome5 name="CrearPosteo" size={24} color="black" /> }} />
            <Tab.Screen name="Perfil" component={Perfil} options={{ headerShown: false, tabBarIcon: () => <FontAwesome5 name="Perfil" size={24} color="black" /> }} />
           
            
        </Tab.Navigator>
    );

}

export default TabNavigation;
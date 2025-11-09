import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {FontAwesome5} from '@expo/vector-icons/FontAwesome5';
import HomeMenu from '../HomeMenu/HomeMenu';

// agregar perfil y posteos una vez que esten hechos 



const Tab = createBottomTabNavigator()

function TabNavigation(props) {
    return (
        <Tab.Navigator>
            <Tab.Screen name="HomeMenu" component={HomeMenu} options={{ headerShown: false, icono: () => <FontAwesome5 name="home" size={24} color="black" /> }} />
           
            
        </Tab.Navigator>
    );

}

export default TabNavigation;
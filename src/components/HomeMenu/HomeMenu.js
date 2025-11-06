import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {FontAwesome5} from '@expo/vector-icons/FontAwesome5';
//import {MaterialIcons} from '@expo/vector-icons/MaterialIcons';
import Home from "../../screens/Home/Home"
// importar profile cuando este hecho
// agregar tab profile cuando este hecho


//cambiar iconos

const Tab = createBottomTabNavigator()

function HomeMenu(props) {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false, icono: () => <FontAwesome5 name="home" size={24} color="black" /> }} />
            
        </Tab.Navigator>
    );

}

export default HomeMenu;
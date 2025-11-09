import React, { Component } from "react"
import { View, Text, StyleSheet, FlatList, Pressable} from "react-native"
import { db, auth } from "../../firebase/config";
// agregar lo de posteos, nombre de usuario y mail 
// hacer css


class Perfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

  

    logout(){
        auth.signOut()
        .then(()=> this.props.navigation.navigate('Login'))
    }

    render() {
        return (
            <View >
                
                <Pressable onPress={() => this.logout()}> 
                    <Text> Logout </Text>
                </Pressable>
    
            </View>
        )
    }

}




        




export default Perfil;
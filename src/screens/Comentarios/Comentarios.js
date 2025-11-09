import React, { Component } from "react"
import { View, Text, StyleSheet, Pressable , TextInput, FlatList} from "react-native"
import { db, auth } from "../../firebase/config";
import firebase from "firebase";
class Comentarios extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comentario: "" ,
        }
    }
    componentDidMount(){
        console.log(this.props)
    }

    render() {
        return (
            <View style={styles.click}>
                <Text style={styles.titulo}>Comentarios</Text>
                <Text style={styles.email}>{this.props.route.params.data.owner}</Text>
               <Text style={styles.mensaje}>{this.props.route.params.data.texto}</Text>
    
            </View>

        )
    }

}

const styles = StyleSheet.create({
     click: {
        padding: 7,
        marginBottom: 10,
        borderRadius: 4
    },
        titulo: {
        fontSize: 24,
        fontWeight: "bold"
    }
})




export default Comentarios;
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

     onSubmit(){
        db.collection("posts").doc(this.props.route.params.data.id).update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({owner : auth.currentUser.email , comentario: this.state.comentario})
          });
           this.setState({comentario : ''})
        
    }

    render() {
        return (
            <View style={styles.click}>
                <Text style={styles.titulo}>Comentarios</Text>
                <Text style={styles.email}>{this.props.route.params.data.owner}</Text>
               <Text style={styles.mensaje}>{this.props.route.params.data.texto}</Text>
               
                 <FlatList
                        data={this.props.route.params.data.comentarios}
                        keyExtractor={(item) => `${this.props.route.params.data.createdAt}+${item.owner}`}
                        renderItem={({ item }) => 
                    <View>
                        <Text> {item.owner}</Text>
                        <Text> {item.comentario}</Text>
                        </View>}
                    />


            
               <TextInput 
                    keyboardType="default"
                    placeholder="Escribi tu comentario"
                    onChangeText={text => this.setState({ comentario: text })}
                    value={this.state.comentario} />
                <Pressable  onPress={() => this.onSubmit()}>
                    <Text > Publicar </Text>
                </Pressable>

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
import React, { Component } from "react"
import { Text, StyleSheet, TextInput, Pressable, View } from "react-native"
import {db , auth} from "../../firebase/config"

class CrearPosteo extends Component {
    constructor(props) {
        super(props)
        this.state= {
            posteo :  "" ,
            error: ""
        }
    }

    onSubmit() {
        if (this.state.posteo === "" ) {
            this.setState({ error: "Tenes que escribir algo " });
        return ;}
        db.collection("posts").add({
            texto : this.state.posteo , 
            owner: auth.currentUser.email ,
            createdAt: Date.now() ,
            likes : [] ,
            comentarios : [],
        })
        .then(()=> this.props.navigation.navigate("HomeMenu"))
        .catch(error => {
            this.setState({error: error.message})
        })
    }

    render() {
        return (
            <View >
                <Text > Posteo </Text>
                <TextInput 
                    keyboardType="default"
                    placeholder="Escribi tu posteo"
                    onChangeText={text => this.setState({ posteo: text })}
                    value={this.state.posteo} />
                <Pressable  onPress={() => this.onSubmit()}>
                    <Text > Publicar </Text>
                </Pressable>
                <Text> 
                    {this.state.error}
                </Text>
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

export default CrearPosteo;
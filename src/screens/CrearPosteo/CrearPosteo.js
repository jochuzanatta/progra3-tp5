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
            this.setState({error: 'Error al crear posteo'})
        })
    }

    render() {
        return (
            <View style={styles.contenedor}>
                <Text style={styles.titulo}> Crea un nuevo posteo </Text>
                <TextInput 
                    style={styles.textInput}
                    keyboardType="default"
                    placeholder="Escribi tu posteo"
                    onChangeText={text => this.setState({ posteo: text })}
                    value={this.state.posteo} />
                <Pressable  style={styles.boton} onPress={() => this.onSubmit()}>
                    <Text style={styles.botonTexto}> Publicar </Text>
                </Pressable>
                <Text style={styles.error}> 
                    {this.state.error}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contenedor: {
    backgroundColor: "rgba(245, 118, 196, 0.48)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff0044ff",
    marginBottom: 20,
    textAlign: "center",
  },
  textInput: {
    width: 400,
    backgroundColor: "#fff",
    borderColor: "#f84877ff",
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    color: "#333",
    fontSize: 16,
    marginBottom: 20,
  },
  boton: {
    backgroundColor: "#ff0044ff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 10,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  botonTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  error: {
    color: "white",
    marginTop: 20,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
})

export default CrearPosteo;
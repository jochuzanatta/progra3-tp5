import React, { Component } from "react"
import { View, Text, StyleSheet, Pressable, TextInput, FlatList } from "react-native"
import { db, auth } from "../../firebase/config";
import firebase from "firebase";
class Comentarios extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comentario: "",
        }
    }
    componentDidMount() {
        console.log(this.props)

    }

    onSubmit() {
        db.collection("posts").doc(this.props.route.params.data.id).update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({ owner: auth.currentUser.email, comentario: this.state.comentario })
        });
        this.setState({ comentario: '' }); 

    }

    render() {
        return (
            <View style={styles.contenedor}>
                <View style={styles.receta}>
                    <Text style={styles.mensaje}>Receta: {this.props.route.params.data.texto}</Text>
                    <Text style={styles.email}>Publicada por: {this.props.route.params.data.owner}</Text>
                </View>
                <Text style={styles.titulo}>Comentarios del Posteo</Text>
                <FlatList
                    data={this.props.route.params.data.comentarios}
                    keyExtractor={(item) => `${this.props.route.params.data.createdAt}+${item.owner}`}
                    renderItem={({ item }) =>
                        <View style={styles.comentariosContenedor}>
                            <Text style={styles.user}> {item.owner}</Text>
                            <Text> {item.comentario}</Text>
                        </View>}
                />
                <View>
                    <TextInput style={styles.escribir}
                        keyboardType="default"
                        placeholder="Escribi tu comentario"
                        onChangeText={text => this.setState({ comentario: text })}
                        value={this.state.comentario} />
                    <Pressable style={styles.boton} onPress={() => this.onSubmit()}>
                        <Text style={styles.botonTexto}> Publicar </Text>
                    </Pressable>
                </View>

            </View>

        )
    }

}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        justifyItems: "center",

    },
    titulo: {
        fontSize: 30,
        color: "#ff0044ff",
        fontWeight: "bold",
        marginBottom: 5,
        paddingRight: 10,
        paddingLeft: 10,
        marginBottom: 15,
        alignSelf: "center",
        justifyContent: "center",
    },
    mensaje: {
        fontSize: 20,
        color: "#ff0044ff",
        fontWeight: "bold",
    },
    receta: {
        backgroundColor: "rgba(245, 118, 196, 0.15)",
        borderColor: "#f84877ff",
        borderWidth: 1,
        padding: 15,
        borderRadius: 15,
        marginVertical: 10,
        width: "90%",
        alignSelf: "center",
    },
    email: {
        fontSize: 15,
        color: "#000000ff",
        fontWeight: "bold",
        marginBottom: 5,
    },
    escribir: {
        width: 400,
        height: 45,
        borderColor: "#f84877ff",
        borderWidth: 1,
        borderRadius: 10,
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: "#fff",
        marginBottom: 15,
        color: "#333",
        width: "90%",
        alignSelf: "center",
    },
    boton: {
        backgroundColor: "#ff0044ff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
        width: 200,
        alignSelf: "center",
    },
    botonTexto: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
    },
    comentariosContenedor: {
        width: 400,
        height: 70,
        borderColor: "#f84877ff",
        borderWidth: 1,
        borderRadius: 10,
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: "#fff",
        marginBottom: 15,
        color: "#333",
        width: "90%",
        alignSelf: "center",
        justifyContent: "center",
    },
    user: {
        fontSize: 15,
        color: "#000000ff",
        fontWeight: "bold",
        marginBottom: 5,
    }
})




export default Comentarios;
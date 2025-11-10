import React, { Component } from "react"
import { Pressable, View, Text, StyleSheet } from "react-native"
import { TextInput } from "react-native-web"
import { db, auth } from "../../firebase/config"

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }

    onSubmit(email, pass) {
        if (!email.includes("@")) {
            this.setState({ error: "Email mal formateado" });
        return ;}

        if (pass.length < 6) {
                this.setState({ error: "La password debe tener una longitud mínima de 6 caracteres" });
                return ;}

        auth.signInWithEmailAndPassword(email,pass)
        .then((response) => {
            this.props.navigation.navigate("TabNavigation");
        })
        .catch(error => {
            this.setState({error: 'Error en el login'})
        })
    } 

    render() {
        return (
            <View style={styles.contenedor}>
                <Text style={styles.titulo}> Ingresar </Text>
                <Pressable style={styles.click}
                    onPress={() => this.props.navigation.navigate("Register")}>
                    <Text>No tengo cuenta</Text>
                </Pressable>
                <TextInput style={styles.field}
                    keyboardType="email-address"
                    placeholder="Email"
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email} />
                <TextInput style={styles.field}
                    keyboardType="default"
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password} />
                <Pressable style={styles.boton} onPress={() => this.onSubmit(this.state.email , this.state.password)}>
                    <Text style={styles.botonTexto}> Login </Text>
                </Pressable>
                <Text> 
                    {this.state.error}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#ff0044ff",
        marginBottom: 20,
    },
    click: {
        backgroundColor: "#f84877ff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
        width: 200,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    contenedor: {
        backgroundColor: "rgba(245, 118, 196, 0.48)",
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    field: {
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
    },
    boton: {
        backgroundColor: "#ff0044ff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
        width: 200,
    },
    botonTexto: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
    },
    preview: {
        marginTop: 20,
        alignItems: "center",
    }
})

export default Login;
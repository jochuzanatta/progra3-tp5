import React, { Component } from "react"
import { Pressable, View, Text, StyleSheet } from "react-native"
import { TextInput } from "react-native-web"
import { auth } from "../../firebase/config"

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
            this.setState({loggedIn : true});
            this.props.navigation.navigate("Home");
        })
        .catch(error => {
            this.setState({error: "Credenciales invalidas"})
        })
        console.log("Datos Ingresados");
        console.log("Email:", this.state.email);
        console.log("Password:", this.state.password);
    } 

    render() {
        return (
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Ingresar</Text>
                <Pressable style={styles.click}
                    onPress={() => this.props.navigation.navigate("Register")}>
                    <Text>No tengo cuenta</Text>
                </Pressable>
                <Pressable style={styles.clickDos}
                    onPress={() => this.props.navigation.navigate("HomeMenu")}>
                    <Text>Ingresar a la app</Text>
                </Pressable>
                <TextInput style={styles.field}
                    keyboardType="email-address"
                    placeholder="email"
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email} />
                <TextInput style={styles.field}
                    keyboardType="default"
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password} />
                <Pressable style={styles.boton} onPress={() => this.onSubmit()}>
                    <Text style={styles.botonTexto}>Login</Text>
                </Pressable>
                <View style={styles.preview}>
                    <Text>Email: {this.state.email}</Text>
                    <Text>Username: {this.state.username}</Text>
                    <Text>Password: {this.state.password}</Text>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 24,
        fontWeight: "bold"
    },
    click: {
        padding: 7,
        backgroundColor: " rgba(18, 208, 255, 1)",
        marginBottom: 10,
        borderRadius: 4
    },
    clickDos: {
        padding: 7,
        backgroundColor: " rgba(255, 168, 18, 1)",
        marginBottom: 10,
        borderRadius: 4
    },
    contenedor: {
        padding: 10,
        alignItems: "center"
    },
    field: {
        height: 20,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        border: 1,
        border: "#ccc",
        border: "solid",
        borderRadius: 6,
        marginTop: 10,
        marginBottom: 10
    },
    boton: {
        backgroundColor: "#28a745",
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 6,
        paddingBottom: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        border: "solid",
        borderColor: "#28a745",
        width: 120
    },
    botonTexto: {
        color: "#fff",
        textAlign: "center",
    },
    preview: {
        marginTop: 20,
        alignItems: "center",
    }
})

export default Login;
//
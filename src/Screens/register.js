import { Component } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { db, auth } from "../firebase/config";

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            username: "",
            pass: "",
            registered: false,
            error: ""
        }
    }

    onSubmit() {
        const { email, pass, username } = this.state;
        if (email === "" || pass === "" || username === "") {
            this.setState({ error: "Todos los campos son obligatorios" });
            return;
        }

        if (!email.includes("@")) {
            this.setState({ error: "El formato del email no es correcto" });
            return;
        }

        if (pass.length < 6) {
            this.setState({
                error: "La contraseña debe tener al menos 6 caracteres",
            });
            return;
        }

        auth.createUserWithEmailAndPassword(this.state.email, this.state.pass)
            .then(res => {
                return db.collection("users").add({
                    email: this.state.email,
                    username: this.state.username,
                    createdAt: Date.now()
                })
            })
            .then(res => {
                this.setState({ registered: true })
                this.props.navigation.navigate("Login");
            })
            .catch(error => {
                this.setState({ error: "Fallo en register" })
                console.log(error);

            })
    }

    render() {
        return (
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Register</Text>
                <Pressable style={styles.click}
                    onPress={() => this.props.navigation.navigate("Login")}>
                    <Text>Ya tengo cuenta</Text>
                </Pressable>
                <TextInput style={styles.field}
                    keyboardType="email-address"
                    placeholder="email"
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email} />
                <TextInput style={styles.field}
                    keyboardType="default"
                    placeholder="username"
                    onChangeText={text => this.setState({ username: text })}
                    value={this.state.username} />
                <TextInput style={styles.field}
                    keyboardType="number-pad"
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ pass: text })}
                    value={this.state.pass} />
                <Pressable style={styles.boton} onPress={() => this.onSubmit()}>
                    <Text style={styles.botonTexto}>Registrarme</Text>
                </Pressable>
                <View style={styles.preview}>
                    <Text>Email: {this.state.email}</Text>
                    <Text>Username: {this.state.username}</Text>
                    <Text>Password: {this.state.pass}</Text>
                </View>
            </View >
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
    contenedor: {
        padding: 10,
        alignItems: "center",
        marginTop: 20
    },
    field: {
        height: 20,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
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

export default Register; 
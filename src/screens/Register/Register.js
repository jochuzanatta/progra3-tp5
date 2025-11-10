import { Component } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { db, auth } from "../../firebase/config";

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            username: "",
            pass: "",
            error: ""

        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user != null) {
                this.props.navigation.navigate("TabNavigation")
            }
        })

    }

    onSubmit() {
        const { email, pass, username } = this.state;
        if (email === "" || pass === "" || username === "") {
            this.setState({ error: "¡Todos los campos son obligatorios!" });
            return;
        }

        if (!email.includes("@")) {
            this.setState({ error: "¡El formato del email no es correcto!" });
            return;
        }

        if (pass.length < 6) {
            this.setState({
                error: "¡La contraseña debe tener al menos 6 caracteres!",
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
                this.props.navigation.navigate("Login");
            })
            .catch(error => {
                this.setState({ error: "Error en el registro" })
                console.log(error);
            })
    }

    render() {
        return (
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>¡Créa tu cuenta y compartí tus recetas!</Text>
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
                <Pressable style={styles.boton} onPress={() => this.props.navigation.navigate("Login")}>
                    <Text style={styles.botonTexto}>Ya tengo cuenta</Text>
                </Pressable>
                     <Text style={styles.error}>{this.state.error}</Text>
            </View >
        )
    }

}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: "rgba(245, 118, 196, 0.48)",
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    titulo: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#ff0044ff",
        marginBottom: 20,
    },
    field: {
        width:400, 
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
        width: 200
    },
    botonTexto: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
    },
    link: {
        color: "#ff0044ff",
        marginTop: 15,
        fontSize: 14,
        fontWeight: "bold",
        color: "#ff0044ff",
        marginBottom: 20,
    },
    error: {
        color: "white",
        marginTop: 20,
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default Register;
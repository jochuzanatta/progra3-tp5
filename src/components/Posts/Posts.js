import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import firebase from "firebase";
import { db, auth } from "../../firebase/config";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
    };
  }

  componentDidMount() {
    const userEmail = auth.currentUser.email;
    const yaLikeo = this.props.data.likes.includes(userEmail);
    this.setState({ liked: yaLikeo });
  }

  like() {
    const userEmail = auth.currentUser.email;

    if (this.state.liked) {
      db.collection("posts").doc(this.props.data.id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(userEmail),
      });
      this.setState({ liked: false });
    } else {
      db.collection("posts").doc(this.props.data.id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(userEmail),
      });
      this.setState({ liked: true });
    }
  }

  render() {
    const cantidadLikes = this.props.data.likes.length;
    return (
      <View style={styles.card}>
        <Text style={styles.email}>{this.props.data.owner}</Text>
        <Text style={styles.mensaje}>{this.props.data.texto}</Text>
        <Text style={styles.likes}>{cantidadLikes} likes</Text>

          <View style={styles.botonesContainer}>
            <Pressable
              style={styles.botonLike}
              onPress={() => this.like()}
            >
              <Text style={styles.botonTexto}>
                {this.state.liked ? "Quitar Like" : "Like"}
              </Text>
            </Pressable>

            <Pressable
              style={styles.botonComentarios}
              onPress={() => this.props.irAcomentarios(this.props.data)}
            >
              <Text style={styles.botonTexto}>
                Ir a comentarios
              </Text>
            </Pressable>
          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
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
    fontSize: 13,
    color: "#ff0044ff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  mensaje: {
    fontSize: 16,
    color: "#333",
    marginVertical: 6,
    textAlign: "center",
  },
  likes: {
    fontSize: 14,
    color: "#ff0044ff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  botonesContainer: {
    alignItems: "center",
  },
  botonLike: {
    backgroundColor: "#ff0044ff",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 8,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  botonComentarios: {
    backgroundColor: "#f84877ff",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 8,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  botonTexto: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default Posts;
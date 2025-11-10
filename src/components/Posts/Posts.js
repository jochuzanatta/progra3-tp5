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

    eliminarPosteo(){
        db.collection('posts').doc(this.props.data.id).delete()


    }

  render() {
    const cantidadLikes = this.props.data.likes.length;
    return (
      <View style={styles.card}>
        <Text style={styles.email}>{this.props.data.owner}</Text>
        <Text style={styles.mensaje}>{this.props.data.texto}</Text>
        <Text style={styles.likes}>{cantidadLikes} likes</Text>
        {this.props.home ? 
        <View> 


        <Pressable
          style={styles.boton}
          onPress={() => this.like()}
        >
          <Text style={styles.botonTexto}>
            {this.state.liked ? "Quitar Like" : "Like"}
          </Text>
        </Pressable>

        <Pressable
          style={styles.boton}
          onPress={() => this.props.irAcomentarios(this.props.data)}
        >
          <Text style={styles.botonTexto}>
            Ir a comentarios
          </Text>
        </Pressable>

         </View> 

        : 
        <Pressable
        style={styles.boton}
        onPress={() => this.eliminarPosteo()}
      >
        <Text style={styles.botonTexto}>
          Eliminar posteo
        </Text>
      </Pressable> } 

      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
    width: "90%",
    alignSelf: "center",
  },
  email: {
    fontSize: 12,
    color: "#555",
  },
  mensaje: {
    fontSize: 16,
    marginVertical: 6,
  },
  likes: {
    fontSize: 14,
    color: "red",
  },
  boton: {
    backgroundColor: "#28a745",
    padding: 6,
    borderRadius: 4,
    marginTop: 8,
  },
  botonTexto: {
    color: "#fff",
    textAlign: "center",
  },
});

export default Posts;
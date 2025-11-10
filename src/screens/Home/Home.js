import React, { Component } from "react"
import { View, Text, StyleSheet} from "react-native"
import { db, auth } from "../../firebase/config";
import Posts from "../../components/Posts/Posts"

// agregar estilos 

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts : [] , 
            loading : true ,
        }
    }

    componentDidMount() {
        db.collection("posts")
            .orderBy("createdAt", "desc")
            .onSnapshot((docs) => {
                let postsArray = [];
                docs.forEach((doc) => {
                    const data = doc.data()
                    postsArray.push({
                        id: doc.id,
                        owner: data.owner,
                        texto: data.texto,
                        createdAt: data.createdAt,
                        comentarios: data.comentarios ,
                        likes: data.likes ,
                    });
                });
                this.setState({ posts: postsArray, loading: false });
            });
    }


    render() {
        return (
            <View style={styles.click}>
                <Text style={styles.titulo}>Home</Text>
    
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




export default Home;
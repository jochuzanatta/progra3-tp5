import React, { Component } from "react"
import { View, Text, StyleSheet, FlatList} from "react-native"
import { db, auth } from "../../firebase/config";
import Posts from "../../components/Posts/Posts"


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

    irAcomentarios(data){
        this.props.navigation.navigate('HomeMenu' , {screen: 'Comentarios', params: {data: data}})
    }


    render() {
        return (
            <View style={styles.flatlist}>
                <Text style={styles.titulo}> Recetas </Text>
                {this.state.loading ? (
                    <Text>Cargando posts...</Text>
                ) : (
                    <FlatList 
                        data={this.state.posts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <Posts data={item} home={true} irAcomentarios={(data) => this.irAcomentarios(data)}/>}
                    />
                )}
    
            </View>
        )
    }

}

const styles = StyleSheet.create({
      flatlist: {
        width: '100%' ,  
        flex : 1
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
})




export default Home;
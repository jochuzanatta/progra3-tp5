import React, { Component } from "react"
import { View, Text, StyleSheet, FlatList, Pressable} from "react-native"
import { db, auth } from "../../firebase/config";
import Posts from "../../components/Posts/Posts";




class Perfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts : '' ,
            loading : true ,
            usuario : {}
        }
    }

    componentDidMount() {
        
        db.collection("posts")
           .where('owner' , '==' , auth.currentUser.email)
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

            db.collection("users")
            .where('email' , '==' , auth.currentUser.email)
             .onSnapshot((docs) => {
                 docs.forEach((doc) => {
                     const data = doc.data()
                     console.log(data)
                     
                     this.setState({usuario : data})
                 });
             });     
    }

    logout(){
        auth.signOut()
        .then(()=> this.props.navigation.navigate('Login'))
    }

    render() {
        return (
            <View style={styles.flatlist}>

                <View style={styles.receta}> 
                <Text style={styles.email}> Username: {this.state.usuario.username }</Text>
                <Text style={styles.email}> Email: {this.state.usuario.email }</Text>
                <Pressable onPress={() => this.logout()}> 
                    <Text style={styles.logout} > Logout </Text>
                </Pressable>
                </View>
                
                

                <Text style={styles.titulo}> Mis Recetas: </Text>

                {this.state.loading ? (
                    <Text>Cargando posts...</Text>
                ) : (
                    <FlatList 
                        data={this.state.posts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <Posts data={item} home={false} />}
                    />

                   
                )}
    
            </View>
        )
    }

}

const styles = StyleSheet.create({
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
    flatlist: {
        width: '100%' ,  
        flex : 1
      },
   boton: {
       backgroundColor: "#ff0044ff",
       paddingVertical: 10,
       paddingHorizontal: 20,
       borderRadius: 10,
       marginTop: 10,
       marginBottom: 10,
       width: 300 ,
       alignSelf: "center",
     },
     botonTexto: {
       color: "#fff",
       fontWeight: "bold",
       textAlign: "center",
       fontSize: 16,
   },
   receta: {
    backgroundColor: "rgba(245, 118, 196, 0.15)",
    borderColor: "#f84877ff",
    borderWidth: 1,
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
    width: 300,
    alignSelf: "center",
  
},
email: {
    fontSize: 15,
    color: "#000000ff",
    fontWeight: "bold",
    marginBottom: 5,
},
logout: {
    color: "#ff0044ff",
    fontWeight: "bold",
    alignSelf: "center",
}
})


export default Perfil;
import React, { Component } from "react"
import { View, Text, StyleSheet, FlatList, Pressable} from "react-native"
import { db, auth } from "../../firebase/config";
import Posts from "../../components/Posts/Posts";

// FALTA APLICAR ESTILOS


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
            <View >
                
                <Text> {this.state.usuario.username }</Text>
                <Text> {this.state.usuario.email }</Text>
               
            
               
                
                <Pressable onPress={() => this.logout()}> 
                    <Text> Logout </Text>
                </Pressable>

                <Text> Mis Recetas: </Text>

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


export default Perfil;
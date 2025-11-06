import React, { Component } from "react"
import { View, Text, StyleSheet} from "react-native"


// agregar lo de crear posts cuanod este hech

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {}
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
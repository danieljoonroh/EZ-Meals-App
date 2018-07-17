import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { HOME } from './constants';
import { MainStyle } from '../styles';

class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    render() {
        return (
            <View style={{ flex: 1, marginTop: 25 }}>
                <View style={{ marginBottom: 10, alignItems: 'center' }}>
                    <TouchableOpacity style={MainStyle.favoritesButton} onPress={() => { this.props.link(HOME) }}>
                        <Text>Home</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.props.favorites}
                    renderItem={({ item }) =>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 15, fontWeight: 'bold' }}>{item.title}</Text>
                            <Image style={{ width: 400, height: 250, marginBottom: 20 }} source={{ uri: item.image }} />
                            <Text style={{ marginBottom: 15 }}>{item.summary}</Text>
                            <TouchableOpacity style={MainStyle.favoritesButton} onPress={this.props.removeMeals.bind(this, item.title)}>
                                <Text>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    keyExtractor={(item, index) => index + ''}
                />
            </View>
        )
    }
}

export default Favorites;
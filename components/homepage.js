import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { CALORIESHOME, DISHSEARCH, MEALPLAN, FAVORITES } from './constants';
import { MainStyle } from '../styles';

export default class Home extends Component {
  render() {
    return (
      <ImageBackground style={MainStyle.container} source={require("../images/homebackground.png")}>
        <View style={MainStyle.header}>
          <Image style={MainStyle.logo} source={require('../images/logo.png')}/>
        </View>
        <View style={{ marginTop: 50 }}>
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 20, }}> </Text>
        </View>
        <View>
          <TouchableOpacity style={MainStyle.homeButton} onPress={() => { this.props.link(DISHSEARCH) }}>
            <Text> Food Name </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={MainStyle.homeButton} onPress={() => { this.props.link(CALORIESHOME) }}>
            <Text> Calorie Count </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={MainStyle.homeButton} onPress={() => { this.props.link(MEALPLAN) }}>
            <Text> Meal Plan </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={MainStyle.homeButton} onPress={() => { this.props.link(FAVORITES) }}>
            <Text> Favorites </Text>
          </TouchableOpacity>
        </View>
        <View style={MainStyle.image}> </View>
      </ImageBackground>
    )
  }
}

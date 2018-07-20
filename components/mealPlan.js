import React from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { HOME, MEALPLANRESULTS } from './constants';
import { MainStyle } from '../styles';
import { convertHTML } from './helper';
import ApiKey from '../config/apikey';
import axios from 'axios';

export default class MealPlan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchDiet: '',
            searchExclude: '',
            searchCal: '',
            searchTimeFrame: '',
            mealPlanObjects: {}
        }
    }

    getMealPlan2 = () => {
        const props = {
            mealPlanObjects: this.state.mealPlanObjects
        }
        this.props.link(MEALPLANRESULTS, props);
    }

    getMealPlan = (searchDiet, searchExclude, searchCal, searchTimeFrame) => {
        let config = {
            headers: {
                "X-Mashape-Key": ApiKey,
                "Accept": "application/json"
            }
        }
        axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?diet=${searchDiet}&exclude=${searchExclude}&targetCalories=${searchCal}&timeFrame=${searchTimeFrame}`, config)
            .then((response) => {
                if (searchTimeFrame.toLowerCase() == 'day') {
                    var { meals } = response.data;
                    var newInfo = [];
                    var promises = [];
                    for (var i = 0; i < meals.length; i++) {
                        var newMealPlanObjects = {};
                        newMealPlanObjects.title = meals[i].title;
                        newMealPlanObjects.image = 'https://spoonacular.com/recipeImages/' + meals[i].id + '-240x150.jpg';
                        newMealPlanObjects.id = meals[i].id;
                        newInfo.push(newMealPlanObjects);
                        promises.push(axios.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + newMealPlanObjects.id + '/summary', config))
                    }
                    Promise.all(promises)
                        .then((res) => {
                            newInfo = newInfo.map((info, i) => {
                                return { ...info, summary: convertHTML(res[i].data.summary) }
                            })
                            this.setState({ mealPlanObjects: newInfo }, this.getMealPlan2);
                        })
                } 
                else if (searchTimeFrame.toLowerCase() == 'week') {
                    var promises = [];
                    var newInfo = [];
                    for (var i = 0; i < response.data.items.length; i++) {
                        let newMealPlanObjects = {};
                        var convertedToObject = JSON.parse(response.data.items[i].value);
                        newMealPlanObjects.title = convertedToObject.title;
                        newMealPlanObjects.id = convertedToObject.id;
                        newMealPlanObjects.image = 'https://spoonacular.com/recipeImages/' + newMealPlanObjects.id + '-240x150.jpg';
                        newInfo.push(newMealPlanObjects);
                        promises.push(axios.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + newMealPlanObjects.id + '/summary', config));
                    }
                    Promise.all(promises)
                        .then((res) => {
                            newInfo = newInfo.map((info, i) => {
                                return { ...info, summary: convertHTML(res[i].data.summary) };
                            })

                            this.setState({ mealPlanObjects: newInfo }, this.getMealPlan2);

                        })
                } 
                else {
                    return alert("Please enter 'Day' or 'Week' in Timeframe");
                }
            })
    }

    render() {
        return (
            <ImageBackground style={MainStyle.container} source={require("../images/homebackground.png")}>
                <KeyboardAvoidingView style={MainStyle.container} behavior="padding">
                    <TouchableOpacity style={MainStyle.button} onPress={() => { this.props.link(HOME) }}>
                        <Text> Back </Text>
                    </TouchableOpacity>
                    <View >
                        <Text style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold', fontSize: 25, marginBottom: 20, textAlign: 'center' }}> Enter diet (optional) </Text>
                    </View>
                    <TextInput
                        style={MainStyle.textInput}
                        placeholder='e.g. vegetarian, pescatarian'
                        onChangeText={(text) => this.setState({ searchDiet: text })} />
                    <Text style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold', fontSize: 25, marginBottom: 20, textAlign: 'center' }}> Exclude (optional) </Text>
                    <TextInput
                        style={MainStyle.textInput}
                        placeholder='e.g. shellfish, olives'
                        onChangeText={(text) => this.setState({ searchExclude: text })} />
                    <Text style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold', fontSize: 25, marginBottom: 20, textAlign: 'center' }}> Target calories per day </Text>
                    <TextInput
                        style={MainStyle.textInput}
                        placeholder='e.g. 2500'
                        onChangeText={(text) => this.setState({ searchCal: text })} />
                    <Text style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold', fontSize: 25, marginBottom: 20, textAlign: 'center' }}> Enter Time frame </Text>
                    <TextInput
                        style={MainStyle.textInput}
                        placeholder='day or week'
                        onChangeText={(text) => this.setState({ searchTimeFrame: text })} />
                    <TouchableOpacity
                        style={MainStyle.mealPlanSubmitButton}
                        onPress={() => this.getMealPlan(this.state.searchDiet, this.state.searchExclude, this.state.searchCal, this.state.searchTimeFrame)}>
                        <Text> Search </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ImageBackground>
        )
    }
}

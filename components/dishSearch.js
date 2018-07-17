import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import axios from 'axios';
import { HOME, DISHRESULTS } from './constants';
import { MainStyle } from '../styles';
import ApiKey from '../config/apikey';
import { objectCreatorForDishName } from './helper';

class DishSearch extends React.Component {
    state = {
        search: '',
        dishNutritionArray: []
    }

    changeHandler = (text) => {
        this.setState({
            search: text
        })
    }

    getNutrientsByDishName = (search) => {
        let config = {
            headers: {
                "X-Mashape-Key": ApiKey,
                "Accept": "application/json"
            }
        }
        axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/guessNutrition?title=" + search + "'", config)
            .then((response) => {
                var nutrients = objectCreatorForDishName(response.data);
                //converting the nutrients from an object to an array
                var nutrientsArray = Object.keys(nutrients).map(i => nutrients[i]);
                nutrientsArray.shift();
                let calories = nutrientsArray.find(x => x.unit === 'calories').value;
                nutrientsArray[1].type = 'Fat';
                nutrientsArray[2].type = 'Protein';
                nutrientsArray[3].type = 'Carbohydrates';
                console.log('NUTRIENTS ARRAY WITH TYPE', nutrientsArray);

                let modifiedNutrientsArrayForPieChart = nutrientsArray.map(function (obj) {
                    switch (obj.type) {
                        case 'Protein':
                            return { ...obj, value: Math.ceil((((obj.value * 4) / calories) * 100)) }
                        case 'Carbohydrates':
                            return { ...obj, value: Math.ceil((((obj.value * 4) / calories) * 100)) }
                        case 'Fat':
                            return { ...obj, value: Math.ceil((((obj.value * 9) / calories) * 100)) }
                        default:
                            return obj
                    }
                })
                this.setState({
                    dishNutritionArray: modifiedNutrientsArrayForPieChart
                }, this.getDish)

            })
    }

    getDish = () => {
        const props = {
            dishNutritionArray: this.state.dishNutritionArray
        }
        this.props.link(DISHRESULTS, props)
    }

    render() {
        return (
            <ImageBackground style={MainStyle.dishSearch} source={require("../images/homebackground.png")}>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={MainStyle.dishSearchButton} onPress={() => { this.props.link(HOME) }}>
                        <Text> Back </Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold', fontSize: 25, marginBottom: 40, textAlign: 'center' }}>Enter Dish Name or Food Item</Text>
                <TextInput
                    style={MainStyle.textInput}
                    placeholder='e.g. Spaghetti or Salmon'
                    onChangeText={this.changeHandler} />
                <TouchableOpacity
                    style={MainStyle.submitButton}
                    onPress={() => this.getNutrientsByDishName(this.state.search)}>
                    <Text>Search</Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

export default DishSearch;
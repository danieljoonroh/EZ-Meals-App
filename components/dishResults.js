import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { HOME, DISHSEARCH } from './constants';
import { PieChart } from 'react-native-svg-charts';
import { MainStyle } from '../styles';

// extracts by grabbing each key name in the objects with the names provided in the curly brackets
const DishResults = ({ dishNutritionArray, link }) => {

    const colors = ['powderblue', 'pink', 'lightgreen'];
    const data = dishNutritionArray.filter(obj => obj.unit !== 'calories').map((x, index) => ({ ...x, svg: { fill: colors[index] }, key: `${index}` }));
    const caloriesData = dishNutritionArray.find(obj => obj.unit == 'calories')
    
    return (
        <View style={{ flex: 1 }}>
            <View style={{ justifyContent: 'space-between', flexDirection: "row" }} >
                <TouchableOpacity style={MainStyle.backHomeButton} onPress={() => { link(DISHSEARCH) }}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={MainStyle.backHomeButton} onPress={() => { link(HOME) }}>
                    <Text>Home</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 50 }} > Calories: {caloriesData.value} </Text>
            </View>
            <PieChart
                valueAccessor={({ item }) => item.value}
                style={{ height: 200, marginBottom: 50 }}
                data={data}
            />
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: data[1].svg.fill, marginLeft: 15, textDecorationLine: "underline" }}>PROTEIN: {data[1].value}%</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: data[2].svg.fill, marginLeft: 15, textDecorationLine: "underline" }}>CARBS: {data[2].value}% </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: data[0].svg.fill, marginLeft: 15, textDecorationLine: "underline" }}>FAT: {data[0].value}% </Text>
            </View>
        </View>
    )
}

export default DishResults;
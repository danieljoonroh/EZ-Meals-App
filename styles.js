import { StyleSheet } from 'react-native';

export const MainStyle = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    dishSearch: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    textInput: {
        width: 230,
        height: 50,
        borderColor: 'black',
        backgroundColor: 'white',
        borderWidth: 3,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 5,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#fce5e5',
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 40,
        borderColor: "black",
        borderRadius: 30,
        marginBottom: 20
    },
    backHomeButton: {
        backgroundColor: 'lightgray',
        height: 40,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 50
    },
    submitButton: {
        backgroundColor: '#fce5e5',
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: 170,
        height: 40,
        borderRadius: 30,
        borderColor: "black",
        marginTop: 20
    },
    dishSearchButton: {
        backgroundColor: '#fce5e5',
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 40,
        borderColor: "black",
        borderRadius: 30,
        marginBottom: 20
    },
    favoritesButton: {
        backgroundColor: 'lightgray',
        height: 40,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 5,
        marginBottom: 25
    },
    header: {
        width: 415,
        height: 195,
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 90
      },
      homeButton: {
        backgroundColor: '#FEDCDC',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 15,
        width: 120,
        height: 50,
        borderRadius: 30,
        borderColor: 'black',
        borderWidth: 3
        
      },
      header: {
        width: 415,
        height: 195,
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 90
      },
      image: {
        marginTop: 40,
        height: 200
      },
      logo: {
        height: 250,
        width: 200
      },
      mealPlanSubmitButton: {
        backgroundColor: '#fce5e5',
        height: 40,
        width: 100,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        borderColor: 'black',
        borderWidth: 3
    },
    resultsView: {
        alignItems: 'center',
        marginTop: 25
    },
    mealPlanResultsBackButton: {
        backgroundColor: 'lightgray',
        height: 40,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 30,
    },
    saveMealSeeNutrients: {
        backgroundColor: 'powderblue',
        height: 40,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10
    },
    mealsCaloriesListImage: {
        width: 400,
        height: 250,
        marginBottom: 20
    },
})

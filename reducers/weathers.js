import { combineReducers } from 'redux'
import { Alert } from 'react-native'
import { 
  RECEIVE_WEATHER,
  RECEIVE_TODAY_WEATHER,
  DELETE_WEATHER,
  REQUEST_WEATHER_ERROR
} from '../actions/action'

function addPlace(state = {}, action) {
 if (action.type === RECEIVE_TODAY_WEATHER) {
    return {
      type: action.type,
      id: action.id,
      placeName: action.placeName,
      code: action.code,
      weather: action.weather,
      temp: action.temp,
      receivedAt: Date.now()
    }
  }
  
  return {}
}

function weathersList(state = [], action) { 
  if (action.type === RECEIVE_TODAY_WEATHER) {
     return [
        addPlace(undefined,action),
        ...state,
      ]
  } else if (action.type === DELETE_WEATHER){
    var newWeathersArray = []     
    state.map(
      t => {
      if (t.id !== action.id) {
        newWeathersArray.push(t);     
      }
    })
    return newWeathersArray
  }
  
  return state
}

function rencentWeathers(state = {weathers: []}, action) { 
  if (action.type === RECEIVE_WEATHER) {
     return {
         type: action.type,
         weathers: action.weathers,
         receivedAt: Date.now()
       }
  }
  
  return state
}

function requestError(state = {}, action) { 
  if (action.type === REQUEST_WEATHER_ERROR) {
     return {
         type: action.type,
         errorMsg: action.errorMsg,
         receivedAt: Date.now()
       }
  }
  
  return state
}

/*
else if (action.type === REQUEST_WEATHER_ERROR) {
    
        Alert.alert(
        action.errorMsg,
        null,
        [
          {text:'确定',onPress:() => {},style: 'cancel'}
        ]
      )
  }
*/

const rootReducer = combineReducers({
  weathersList,
  rencentWeathers,
  requestError
})

export default rootReducer
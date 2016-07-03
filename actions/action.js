export const RECEIVE_TODAY_WEATHER = 'RECEIVE_TODAY_WEATHER'
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER'
export const DELETE_WEATHER = 'DELETE_WEATHER'
export const REQUEST_WEATHER_ERROR = 'REQUEST_WEATHER_ERROR'

export function fetchTodayWeather(placeName) {
    return async dispatch => {
      try {  
        let urlStr = 'https://api.thinkpage.cn/v3/weather/now.json?key=fwo1autufmfogg9b&location='+placeName+'&language=zh-Hans&unit=c'
 
        const response = await fetch(urlStr)
        const json = await response.json()
        if(json.status) {
          var errorMsg = '没有找到 “' + placeName + '” 城市天气'
            dispatch(requestWeatherError(errorMsg))
          } else {
            dispatch(receiveTodayWeather(placeName, json)) 
          }
      } catch (errorMsg) {
        dispatch(requestWeatherError(errorMsg))
      }
    }
}

let nextWeatherID = 0
export const receiveTodayWeather = (placeName,json) => {
    return {
    type: RECEIVE_TODAY_WEATHER,
    id: nextWeatherID++,
    placeName: json.results[0].location.name,
    code: json.results[0].now.code,
    weather: json.results[0].now.text,
    temp: json.results[0].now.temperature,
    receivedAt: Date.now()
  }
}

export const requestWeatherError = (errorMsg) => {
  return {
    type: REQUEST_WEATHER_ERROR,
    errorMsg,
    receivedAt: Date.now()
  }
}

export function fetchWeather(placeName) {
    return async dispatch => {
      try {  
        let urlStr = 'https://api.thinkpage.cn/v3/weather/daily.json?key=fwo1autufmfogg9b&location='+placeName+'&language=zh-Hans&unit=c&start=0&days=5'
  
        const response = await fetch(urlStr)
        const json = await response.json()
        if(json.status) {
          var errorMsg = '没有找到 “' + placeName + '” 城市天气'
            dispatch(requestWeatherError(errorMsg))
          } else {
            dispatch(receiveWeather(placeName, json)) 
          }
      } catch (errorMsg) {
        dispatch(requestWeatherError(errorMsg))
      }
    }
}

export const receiveWeather = (placeName,json) => {                
  return {
    type: RECEIVE_WEATHER,
    placeName,
    weathers: json.results[0].daily,
    receivedAt: Date.now()
  }
}

export function deleteWeather(id) {
  return {
    type: DELETE_WEATHER,
    id
  }
}
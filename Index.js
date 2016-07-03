import React, { Component, } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import App from './components/app'
import rootReducer from './reducers/weathers'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

const loggerMiddleware = createLogger()

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore)

let store = createStoreWithMiddleware(rootReducer)

class HomePage extends Component {
  render() {
    return (
    <Provider store={store}>
      <App store={store}/>
    </Provider>
  );
  }
}

AppRegistry.registerComponent('QWeather',() => HomePage);
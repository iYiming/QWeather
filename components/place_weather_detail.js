/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  Modal,
  Image,
} from 'react-native';
import { connect } from 'react-redux'
import { weatherImageName } from './weather_image_require'
import { fetchWeather } from '../actions/action'

class PlaceWeatherDetail extends Component {  
  constructor(props) {
    super(props)
    
  }
  
  render() {    
    return (
      <View style={styles.container}>
        <View style={{justifyContent: 'center',alignItems: 'center',marginTop:80}}>
        <Text style={{fontSize: 80,color: 'rgba(90,202,91,1)', }}>{this.props.todayWeather.temp}℃</Text>
        <Text style={{fontSize: 20,color: 'rgba(90,202,91,1)', }}>{this.props.todayWeather.weather}</Text>
        </View>
        <View style={styles.colorBgView}>
        {
        this.props.weathers.map((weather,index) => {
          return (
            <TouchableHighlight key={index} 
              style={{marginTop:40}}>
            <View style={{width:80,height:100,justifyContent: 'center',alignItems: 'center',borderColor:'rgba(240,240,240,1)',borderWidth: 0.5}}>
            <Text style={{fontSize: 10,color: 'rgba(140,140,140,1)'}}>{weather.date}</Text>
            <Image style={{width: 60,height: 60,marginTop: 10}} source={weatherImageName(weather.code_day)}></Image>
            <Text style={{fontSize: 12,marginTop: 10,color: 'rgba(90,202,91,1)'}}>{weather.text_day}</Text>
            <Text style={{fontSize: 10,marginTop: 10}}>{weather.low}~{weather.high}℃</Text>
            </View>
          </TouchableHighlight>
          )
        })
        }
        </View>
      </View>
    )
  }
  
   componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchWeather(this.props.todayWeather.placeName))
  }
  
  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  
  save() {
    if (this.state.text === undefined || this.state.color === undefined) {
      Alert.alert(
        '请输入任务标题并选择颜色',
        null,
        [
          {text:'确定',onPress:() => {},style: 'cancel'}
        ]
      )
      return
    }
    
    const { dispatch } = this.props
    dispatch(updateTodo(this.state.id,this.state.text,this.state.color))
    this.props.navigator.pop()
  }
}

PlaceWeatherDetail.propTypes = {
  onAddClick: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#eeeeee',
  },
  titleText: {
    marginLeft:10
  },
  textInput: {
    marginTop:20,
    marginLeft:10,
    marginRight:10,
    height:44,
    borderColor: 'rgba(220,220,220,1)',
    borderWidth:1
  },
  colorText:{
    marginTop: 20,
    marginLeft: 10
  },
  colorBgView: {
    marginTop: 10,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-around'
  },
  saveTouchableOpacity: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(220,220,220,1)',
    marginLeft: 10,
    marginRight: 10
  },
  saveText: {
    color: 'blue',
    fontSize: 18,
    color: 'rgba(90,202,91,1)', 
  }
});

function select(state) {
  const { weathersList, rencentWeathers } = state
  
  return {
    weathers: rencentWeathers.weathers
  };
}

export default connect(select)(PlaceWeatherDetail);

import React, { Component, PropTypes } from 'react'
import { View,StyleSheet,ListView,TouchableHighlight,Text,Alert } from 'react-native'
import PlaceWeatherDetail from './place_weather_detail'
import PlaceWeather from './place_weather'
import { connect, dispatch } from 'react-redux'
import { deleteWeather} from '../actions/action'

class PlaceWeatherList extends Component {
  static propTypes = {}

  constructor(props) {      
    super(props)    
  }

  render() {
    return (
       <ListView   
         style={styles.container}
         dataSource={this.props.placeWeathersArray} 
         renderRow={(placeWeatherInfo) => this.renderRow(placeWeatherInfo)}
         enableEmptySections = {true}>
      </ListView>
    );
  }

  renderRow(placeWeatherInfo) {
    return (
      <PlaceWeather {... placeWeatherInfo} onClick={this.showDetailPage.bind(this, placeWeatherInfo)} onLongPress={this.longPress.bind(this, placeWeatherInfo)}></PlaceWeather>
    );
  }
  
  showDetailPage(placeWeatherInfo) {
    this.props.navigator.push({
      title: placeWeatherInfo.placeName,
      component: PlaceWeatherDetail,
      params:{onAddClick: () => {console.log('保存')},todayWeather: placeWeatherInfo,weathers: []},
    }) 
  }
  
  longPress(placeWeatherInfo){
    const {dispatch} = this.props
    Alert.alert(
      '是否删除'+ placeWeatherInfo.placeName + '天气？',
      placeWeatherInfo.text,
      [
        {text:'取消',onPress:() => {},style: 'cancel'},
        {text:'删除',onPress:() => dispatch(deleteWeather(placeWeatherInfo.id))},
      ]
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    backgroundColor: '#eeeeee',
  },
  row: {
    marginTop: 10,
    height: 44,
    backgroundColor: 'white',
  },
  rowContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowColor: {
    backgroundColor: 'red',
    width: 4,
    height: 44,
  },
  rowText: {
    marginLeft: 4
  }
});

function weathers(state) {
  const { weathersList, rencentWeathers,requestError } = state
  
  if(requestError.errorMsg) {
      Alert.alert(
        requestError.errorMsg,
        null,
        [
          {text:'确定',onPress:() => {},style: 'cancel'}
        ]
      )
      
      requestError.errorMsg = ''
  }
  
  const ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
  return {
    placeWeathersArray: ds.cloneWithRows(weathersList)
  };
}

export default connect(weathers)(PlaceWeatherList);


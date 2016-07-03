import React, { Component,PropTypes } from 'react'
import { 
  StyleSheet,
  View, 
  TouchableHighlight,
  Text,
  Image,
} from 'react-native'

import { weatherImageName } from './weather_image_require'

export default class PlaceWeather extends Component {
  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  
  render() {
    const imageSrc = weatherImageName(this.props.code)
    return (
      <TouchableHighlight style={styles.row} underlayColor='#C1DBF0' onPress={this.props.onClick} onLongPress={(this.props.onLongPress)}>
        <View style={styles.rowContent}>
          <Image style={styles.icon} source={imageSrc}></Image>
          <View style={{flex: 1,height: 60,marginLeft: 10}}>
          <Text style={styles.rowTitleText}>{this.props.placeName}</Text>
          <Text style={styles.rowSubtitleText}>{this.props.weather} {this.props.temp}°C</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    marginTop: 10,
    backgroundColor: 'white',
  },
  rowContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60
  },
  rowColor: {
    backgroundColor: 'red',
    width: 6,
    height: 44,
  },
  rowTitleText: {
    fontSize: 22,
    marginTop: 8,
    fontWeight: 'bold',
  },
  rowSubtitleText: {
    color: 'rgba(90,202,91,1)',
    fontSize: 14,
    marginTop: 8,
    marginLeft: 2
  }
});

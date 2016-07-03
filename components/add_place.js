/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import {
  AppRegistry,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  Alert
} from 'react-native';
import { fetchTodayWeather } from '../actions/action'

class AddPlace extends Component {  
  constructor(props) {
    super(props)
    
    this.state = {
      
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          multiline={false}
          style={styles.textInput}
          placeholder='请输入城市名称 如青岛...'
          onChange={(event) => this.updateText(event.nativeEvent.text)}
          returnKeyType='done'
          ref='myInput'
        />
        <TouchableOpacity style={styles.saveTouchableOpacity} onPress={this.save.bind(this)}>
          <Text style={styles.saveText}>保存</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
     componentDidMount() {
       this.refs['myInput'].focus()
  }
  
  updateText(text) {
    this.setState((state) => {
      return {
        placeName: text.replace(/(^\s*)|(\s*$)/g,"")
      };
    });
  }
  
  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  
  save() {
    
    if (this.state.placeName === undefined) {
      Alert.alert(
        '请输入城市名称',
        null,
        [
          {text:'确定',onPress:() => {},style: 'cancel'}
        ]
      )
      return
    }
    
    const { dispatch } = this.props
    dispatch(fetchTodayWeather(this.state.placeName))
    this.props.navigator.pop()
  }
}

AddPlace.propTypes = {
  onAddClick: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#eeeeee'
  },
  textInput: {
    marginTop:80,
    marginLeft:10,
    marginRight:10,
    height:44,
    borderColor: 'rgba(220,220,220,1)',
    borderWidth:1
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
    fontSize: 18,
    color: 'rgba(90,202,91,1)', 
  }
});

export default connect()(AddPlace)

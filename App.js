import React, { Component } from 'react'

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Switch,
} from 'react-native'

export default class App extends Component {
  state = {
    timer: new Animated.Value(-100),
    backward: false,
    useNativeDriver: true,
  }

  handlePress = () => {
    let { timer, backward, useNativeDriver } = this.state
    let targetValue = backward ? -100 : 100

    this.setState({ backward: !backward })

    Animated.timing(this.state.timer, {
      useNativeDriver,
      toValue: targetValue,
      easing: Easing.out(Easing.exp),
      duration: 700,
      delay: 50,
    }).start()
  }

  handleFlipSwitch = useNativeDriver => {
    this.setState({ useNativeDriver })
  }

  render() {
    let { timer, useNativeDriver } = this.state

    return (
      <Animated.View
        style={[
          styles.wrapper, {
            transform: [{
              translateX: timer
            }]
          }
        ]}
      >
        <Text style={styles.text}>Hello, world</Text>
        <TouchableOpacity onPress={this.handlePress}>
          <View style={styles.button} onPress={this.handlePress}>
            <Text style={styles.buttonText}>
              Animate!
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.switchWrapper}>
          <Text style={styles.switchLabel}>
            useNativeDriver
          </Text>
          <Switch
            value={useNativeDriver}
            onValueChange={this.handleFlipSwitch}
            tintColor="#ccc"
            onTintColor="#0cf"
            thumbTintColor="#fff"
          />
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#04f',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 24
  },
  button: {
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 100
  },
  buttonText: {
    fontSize: 16,
    color: '#04f'
  },
  box: {
    backgroundColor: '#fff',
    width: 100,
    height: 100,
    position: 'absolute',
    top: 100,
  },
  switchWrapper: {
    marginTop: 20,
    flexDirection: 'row'
  },
  switchLabel: {
    color: '#fff'
  }
})

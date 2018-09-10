import { Animated, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';

class DoneButton extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),
  };

  componentDidMount() {
    setTimeout(() => {
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 1000,
      }).start();
    }, 1000);
  }

  render() {
    const { isLight, ...rest } = this.props;
    const { fadeAnim } = this.state;

    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}
      >
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonTitle} ellipsizeMode="middle">Got it</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  buttonContainer:{
    borderRadius: 10,
    backgroundColor: '#4549D1',
    width: 300,
    height: 40,
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonTitle:{
    color: 'white',
    fontFamily: 'HelveticaNeueCyr-Medium',
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'center'
  }
});

export default DoneButton;

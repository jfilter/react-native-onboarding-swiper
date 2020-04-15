import { Animated } from 'react-native';
import React from 'react';

import { BUTTON_SIZE, MARGIN_RIGHT, getDefaultStyle } from './util';
import SymbolButton from './SymbolButton';

class DoneButton extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),
  };

  componentDidMount() {
    setTimeout(() => {
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
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
        <SymbolButton
          size={BUTTON_SIZE}
          textStyle={getDefaultStyle(isLight)}
          style={{
            borderRadius: BUTTON_SIZE / 2,
            backgroundColor: 'rgba(255, 255, 255, 0.10)',
            margin: MARGIN_RIGHT,
          }}
          {...rest}
        >
          ✓
        </SymbolButton>
      </Animated.View>
    );
  }
}

export default DoneButton;

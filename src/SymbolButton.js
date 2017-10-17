import { View, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const SymbolButton = ({ size, onPress, style, textStyle, children }) => (
  <View
    style={{ height: size, width: size, justifyContent: 'center', ...style }}
  >
    <TouchableOpacity 
      style={{ flex: 0 }} 
      onPress={onPress}
      hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
    >
      <Text style={{ textAlign: 'center', fontSize: size / 1.7, ...textStyle }}>
        {children}
      </Text>
    </TouchableOpacity>
  </View>
);

SymbolButton.propTypes = {
  size: PropTypes.number.isRequired,
  onPress: PropTypes.func,
  style: View.propTypes.style,
  textStyle: Text.propTypes.style,
};

SymbolButton.defaultProps = {
  style: null,
  textStyle: null,
};

export default SymbolButton;

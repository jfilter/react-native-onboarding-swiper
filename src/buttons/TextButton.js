import { View, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const TextButton = ({ size, onPress, textStyle, style, children }) => (
  <View style={{ flex: 0, paddingHorizontal: 10, ...style }}>
    <TouchableOpacity
      style={{ flex: 0 }}
      onPress={onPress}
      hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
    >
      <Text style={{ fontSize: size / 2.5, ...textStyle }}>{children}</Text>
    </TouchableOpacity>
  </View>
);

TextButton.propTypes = {
  size: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  textStyle: Text.propTypes.style,
};

TextButton.defaultProps = {
  textStyle: null,
};

export default TextButton;

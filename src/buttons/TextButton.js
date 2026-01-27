import { View, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const TextButton = ({ size, onPress, textStyle = null, allowFontScaling = true, style, disabled, children }) => (
  <View style={{ flex: 0, paddingHorizontal: 10, opacity: disabled ? 0.3 : 1, ...style }}>
    <TouchableOpacity
      style={{ flex: 0 }}
      onPress={onPress}
      disabled={disabled}
      hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
    >
      <Text allowFontScaling={allowFontScaling} style={{ fontSize: size / 2.5, ...textStyle }}>{children}</Text>
    </TouchableOpacity>
  </View>
);

TextButton.propTypes = {
  size: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  textStyle: PropTypes.shape({
    style: PropTypes.any,
  }),
  allowFontScaling: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default TextButton;

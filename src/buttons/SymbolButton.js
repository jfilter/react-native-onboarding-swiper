import { View, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const SymbolButton = ({ size, onPress, style, textStyle, children }) => (
  <View
    style={{
      height: size,
      width: size,
      justifyContent: 'center',
      alignItems: 'center',
      ...style,
    }}
  >
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}
      hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
    >
      <Text allowFontScaling={false} style={{ textAlign: 'center', fontSize: size / 1.7, ...textStyle }}>
        {children}
      </Text>
    </TouchableOpacity>
  </View>
);

SymbolButton.propTypes = {
  size: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.shape({
    style: PropTypes.any,
  }),
  textStyle: PropTypes.shape({
    style: PropTypes.any,
  }),
};

SymbolButton.defaultProps = {
  style: null,
  textStyle: null,
};

export default SymbolButton;

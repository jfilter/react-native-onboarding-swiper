import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const SymbolButton = ({ size, onPress, style, children }) => (
  <View style={{ height: size, width: size, justifyContent: 'center', ...style }}>
    <TouchableOpacity style={{ flex: 0 }} onPress={onPress}>
      <Text style={{ textAlign: 'center', color: '#fff', fontSize: size / 1.7 }}>{children}</Text>
    </TouchableOpacity>
  </View>
);

const TextButton = ({ size, onPress, children }) => (
  <View style={{ flex: 0 }}>
    <TouchableOpacity style={{ flex: 0 }} onPress={onPress}>
      <Text style={{ color: '#fff', fontSize: size / 2.5 }}>{children}</Text>
    </TouchableOpacity>
  </View>
);

export { SymbolButton, TextButton };

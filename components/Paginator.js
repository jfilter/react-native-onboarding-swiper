import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import PageDots from './PageDots';
import { SymbolButton, TextButton } from './Buttons';

const SkipButton = ({ size, onPress }) => (
  <TextButton size={size} onPress={onPress}>Skip</TextButton>
);

const NextButton = ({ size, onPress }) => (
  <SymbolButton size={size} onPress={onPress}>
    →
  </SymbolButton>
);
const DoneButton = ({ size, onPress }) => (
  <SymbolButton size={size} onPress={onPress} style={{ borderRadius: size / 2, backgroundColor: 'rgba(255, 255, 255, 0.10)' }}>
    ✓
  </SymbolButton>
);

const Paginator = ({ pages, currentPage, onEnd, onNext }) => (
  <View style={styles.container}>
    <View style={styles.buttonLeft}>
      {currentPage + 1 !== pages ? (
        <SkipButton size={40} onPress={onEnd} />
      ) : null}
    </View>
    <PageDots pages={pages} currentPage={currentPage} />
    <View style={styles.buttonRight}>
      {currentPage + 1 === pages ?
        <DoneButton size={40} onPress={onEnd} /> :
        <NextButton size={40} onPress={onNext} />
      }
    </View>
  </View>
);

const styles = {
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 60,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonLeft: {
    width: 70,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonRight: {
    width: 70,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
};

export default Paginator;

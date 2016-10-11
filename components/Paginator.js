import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import PageDots from './PageDots';
import { SymbolButton, TextButton } from './Buttons';

const getDefaultStyle = (isLight) => ({
  color: isLight ? 'rgba(0, 0, 0, 0.8)' : '#fff',
});

const SkipButton = ({ isLight, ...props }) => (
  <TextButton {...props} textStyle={getDefaultStyle(isLight)}>
    Skip
  </TextButton>
);

const NextButton = ({ isLight, ...props }) => (
  <SymbolButton {...props} textStyle={getDefaultStyle(isLight)}>
    →
  </SymbolButton>
);
const DoneButton = ({ isLight, size, ...props }) => (
  <SymbolButton {...props} size={size} textStyle={getDefaultStyle(isLight)} style={{ borderRadius: size / 2, backgroundColor: 'rgba(255, 255, 255, 0.10)' }}>
    ✓
  </SymbolButton>
);

const BUTTON_SIZE = 40;
const Paginator = ({ isLight, overlay, showSkip, showNext, showDone, pages, currentPage, onEnd, onNext }) => (
  <View style={{ ...styles.container, ...(overlay ? styles.containerOverlay : {}) }}>
    <View style={styles.buttonLeft}>
      {showSkip && currentPage + 1 !== pages ?
        <SkipButton isLight={isLight} size={BUTTON_SIZE} onPress={onEnd} /> :
        null
      }
    </View>
    <PageDots isLight={isLight} pages={pages} currentPage={currentPage} />
    <View style={styles.buttonRight}>
      {currentPage + 1 === pages ?
        (showDone ? <DoneButton isLight={isLight} size={BUTTON_SIZE} onPress={onEnd} /> : null) :
        (showNext ? <NextButton isLight={isLight} size={BUTTON_SIZE} onPress={onNext} /> : null)
      }
    </View>
  </View>
);

const styles = {
  container: {
    height: 60,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
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

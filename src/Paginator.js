import { View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import Dots from './Dots';
import SymbolButton from './SymbolButton';
import TextButton from './TextButton';

const BUTTON_SIZE = 40;

const getDefaultStyle = isLight => ({
  color: isLight ? 'rgba(0, 0, 0, 0.8)' : '#fff',
});

const Paginator = ({
  numPages,
  currentPage,
  isLight,
  overlay,
  showSkip,
  showNext,
  showDone,
  onNext,
  onSkip,
  onDone,
}) => {
  const isLastPage = currentPage + 1 === numPages;

  const SkipButton = showSkip &&
    !isLastPage && (
      <TextButton
        size={BUTTON_SIZE}
        textStyle={getDefaultStyle(isLight)}
        onPress={onSkip}
      >
        Skip
      </TextButton>
    );

  const NextButton = showNext &&
    !isLastPage && (
      <SymbolButton
        size={BUTTON_SIZE}
        textStyle={getDefaultStyle(isLight)}
        onPress={onNext}
      >
        →
      </SymbolButton>
    );

  const DoneButton = showDone &&
    isLastPage && (
      <SymbolButton
        size={BUTTON_SIZE}
        textStyle={getDefaultStyle(isLight)}
        style={{
          borderRadius: BUTTON_SIZE / 2,
          backgroundColor: 'rgba(255, 255, 255, 0.10)',
        }}
        onPress={onDone}
      >
        ✓
      </SymbolButton>
    );

  return (
    <View
      style={{
        ...styles.container,
        ...(overlay ? styles.containerOverlay : {}),
      }}
    >
      <View style={styles.buttonLeft}>{SkipButton}</View>
      <Dots isLight={isLight} numPages={numPages} currentPage={currentPage} />
      <View style={styles.buttonRight}>
        {NextButton}
        {DoneButton}
      </View>
    </View>
  );
};

Paginator.propTypes = {
  numPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  isLight: PropTypes.bool.isRequired,
  overlay: PropTypes.bool.isRequired,
  showNext: PropTypes.bool,
  showSkip: PropTypes.bool,
  showDone: PropTypes.bool,
  onNext: PropTypes.func,
  onSkip: PropTypes.func,
  onDone: PropTypes.func,
};

Paginator.defaultProps = {
  showNext: true,
  showSkip: true,
  showDone: true,
};

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
  },
};

export default Paginator;

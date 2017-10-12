import { StatusBar, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import Dots from './Dots';
import SymbolButton from './SymbolButton';
import TextButton from './TextButton';

const BUTTON_SIZE = 40;

const getDefaultStyle = isLight => ({
  color: isLight ? 'rgba(0, 0, 0, 0.8)' : '#fff',
});

const Pagination = ({
  numPages,
  currentPage,
  isLight,
  alterBottomColor,
  showSkip,
  showNext,
  showDone,
  onNext,
  onSkip,
  onDone,
  skipLabel,
}) => {
  const isLastPage = currentPage + 1 === numPages;

  const SkipButton = showSkip &&
    !isLastPage && (
      <TextButton
        size={BUTTON_SIZE}
        textStyle={getDefaultStyle(isLight)}
        onPress={() => {
          onSkip && onSkip();
          StatusBar.setBarStyle('default');
        }}
      >
        {skipLabel}
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
        onPress={() => {
          onDone && onDone();
          StatusBar.setBarStyle('default');
        }}
      >
        ✓
      </SymbolButton>
    );

  return (
    <View
      style={{
        ...styles.container,
        ...(alterBottomColor ? styles.overlay : {}),
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

Pagination.propTypes = {
  numPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  isLight: PropTypes.bool.isRequired,
  alterBottomColor: PropTypes.bool.isRequired,
  showNext: PropTypes.bool,
  showSkip: PropTypes.bool,
  showDone: PropTypes.bool,
  onNext: PropTypes.func,
  onSkip: PropTypes.func,
  onDone: PropTypes.func,
  skipLabel: PropTypes.string.isRequired,
};

Pagination.defaultProps = {
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
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  buttonLeft: {
    width: 70,
    paddingLeft: 20,
  },
  buttonRight: {
    width: 70,
    paddingRight: 10,
    alignItems: 'flex-end',
  },
};

export default Pagination;

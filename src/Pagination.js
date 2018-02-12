import { StatusBar, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import Dots from './Dots';

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
  SkipButton,
  NextButton,
  DoneButton,
  Dot,
}) => {
  const isLastPage = currentPage + 1 === numPages;

  const SkipButtonFinal = showSkip &&
    !isLastPage && (
      <SkipButton
        size={BUTTON_SIZE}
        textStyle={getDefaultStyle(isLight)}
        onPress={() => {
          if (typeof onSkip === 'function') {
            onSkip();
            StatusBar.setBarStyle('default');
          }
        }}
      >
        {skipLabel}
      </SkipButton>
    );

  const NextButtonFinal = showNext &&
    !isLastPage && (
      <NextButton
        size={BUTTON_SIZE}
        textStyle={getDefaultStyle(isLight)}
        onPress={onNext}
      >
        →
      </NextButton>
    );

  const DoneButtonFinal = showDone &&
    isLastPage && (
      <DoneButton
        size={BUTTON_SIZE}
        textStyle={getDefaultStyle(isLight)}
        style={{
          borderRadius: BUTTON_SIZE / 2,
          backgroundColor: 'rgba(255, 255, 255, 0.10)',
        }}
        onPress={() => {
          if (typeof onDone === 'function') {
            onDone();
            StatusBar.setBarStyle('default');
          }
        }}
      >
        ✓
      </DoneButton>
    );

  return (
    <View
      style={{
        ...styles.container,
        ...(alterBottomColor ? styles.overlay : {}),
      }}
    >
      <View style={styles.buttonLeft}>{SkipButtonFinal}</View>
      <Dots
        isLight={isLight}
        numPages={numPages}
        currentPage={currentPage}
        Dot={Dot}
      />
      <View style={styles.buttonRight}>
        {NextButtonFinal}
        {DoneButtonFinal}
      </View>
    </View>
  );
};

Pagination.propTypes = {
  numPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  isLight: PropTypes.bool.isRequired,
  alterBottomColor: PropTypes.bool.isRequired,
  showNext: PropTypes.bool.isRequired,
  showSkip: PropTypes.bool.isRequired,
  showDone: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired,
  onSkip: PropTypes.func,
  onDone: PropTypes.func,
  skipLabel: PropTypes.string.isRequired,
  SkipButton: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  DoneButton: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  NextButton: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  Dot: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
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

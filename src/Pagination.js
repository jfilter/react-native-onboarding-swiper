import { View, StatusBar, I18nManager, Platform } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import Dots from './Dots';

const Pagination = ({
  numPages,
  currentPage,
  isLight,
  bottomBarHeight,
  bottomBarColor,
  controlStatusBar,
  showSkip,
  showNext,
  showDone,
  onNext,
  onSkip,
  onDone,
  skipLabel,
  nextLabel,
  allowFontScaling,
  SkipButtonComponent,
  NextButtonComponent,
  DoneButtonComponent,
  DotComponent,
}) => {
  const isLastPage =
    I18nManager.isRTL && Platform.OS == 'ios'
      ? currentPage === 0
      : currentPage + 1 === numPages;

  const SkipButtonFinal = showSkip && !isLastPage && (
    <SkipButtonComponent
      isLight={isLight}
      skipLabel={skipLabel}
      allowFontScaling={allowFontScaling}
      onPress={() => {
        if (typeof onSkip === 'function') {
          if (controlStatusBar) {
            StatusBar.setBarStyle('default', true);
          }
          onSkip();
        }
      }}
    />
  );

  const NextButtonFinal = showNext && !isLastPage && (
    <NextButtonComponent
      nextLabel={nextLabel}
      allowFontScaling={allowFontScaling}
      isLight={isLight}
      onPress={onNext}
    />
  );

  const DoneButtonFinal = showDone && isLastPage && (
    <DoneButtonComponent
      isLight={isLight}
      allowFontScaling={allowFontScaling}
      onPress={() => {
        if (typeof onDone === 'function') {
          if (controlStatusBar) {
            StatusBar.setBarStyle('default', true);
          }
          onDone();
        }
      }}
    />
  );

  return (
    <View
      style={{
        height: bottomBarHeight,
        backgroundColor: bottomBarColor,
        ...styles.container,
      }}
    >
      <View style={styles.buttonLeft}>{SkipButtonFinal}</View>
      <Dots
        isLight={isLight}
        numPages={numPages}
        currentPage={currentPage}
        Dot={DotComponent}
        style={styles.dots}
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
  bottomBarHeight: PropTypes.number.isRequired,
  bottomBarColor: PropTypes.string.isRequired,
  showNext: PropTypes.bool.isRequired,
  showSkip: PropTypes.bool.isRequired,
  showDone: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired,
  onSkip: PropTypes.func,
  onDone: PropTypes.func,
  allowFontScaling: PropTypes.bool,
  skipLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  nextLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  SkipButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  DoneButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  NextButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  DotComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

const styles = {
  container: {
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonLeft: {
    width: 200,
    flexShrink: 1,
    alignItems: 'flex-start',
  },
  buttonRight: {
    width: 200,
    flexShrink: 1,
    alignItems: 'flex-end',
  },
  dots: {
    flexShrink: 0,
  },
};

export default Pagination;

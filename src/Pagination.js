import { View, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import Dots from './Dots';

const Pagination = ({
  numPages,
  currentPage,
  isLight,
  bottomBarHeight,
  controlStatusBar,
  showBack,
  showSkip,
  showNext,
  showDone,
  onBack,
  onNext,
  onSkip,
  onDone,
  backLabel,
  skipLabel,
  nextLabel,
  allowFontScaling,
  BackButtonComponent,
  SkipButtonComponent,
  NextButtonComponent,
  DoneButtonComponent,
  DotComponent,
  skipIsPageSpecific,
}) => {
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage + 1 === numPages;

  const SkipButtonFinal = showSkip &&
    isFirstPage && (
      <SkipButtonComponent
        isLight={isLight}
        skipLabel={skipLabel}
		    allowFontScaling={allowFontScaling}
        onPress={() => {
          if (typeof onSkip === 'function') {
            if (controlStatusBar) {
              StatusBar.setBarStyle('default', true);
            }
            onSkip(skipIsPageSpecific ? currentPage : undefined);
          }
        }}
      />
    );

  const BackButtonFinal = showBack &&
      !isFirstPage && (
        <BackButtonComponent
          isLight={isLight}
          backLabel={backLabel}
          allowFontScaling={allowFontScaling}
          onPress={() => {
            if (typeof onBack === 'function') {
              if (controlStatusBar) {
                StatusBar.setBarStyle('default', true);
              }
              onBack();
            }
          }}
        />
      );

  const NextButtonFinal = showNext &&
    !isLastPage && (
      <NextButtonComponent
        nextLabel={nextLabel}
		allowFontScaling={allowFontScaling}
        isLight={isLight}
        onPress={onNext}
      />
    );

  const DoneButtonFinal = showDone &&
    isLastPage && (
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
        ...styles.container,
      }}
    >
      <View style={styles.buttonLeft}>
        {SkipButtonFinal}
        {BackButtonFinal}
      </View>
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
  showNext: PropTypes.bool.isRequired,
  showSkip: PropTypes.bool.isRequired,
  showDone: PropTypes.bool.isRequired,
  onBack: PropTypes.func,
  onNext: PropTypes.func.isRequired,
  onSkip: PropTypes.func,
  onDone: PropTypes.func,
  allowFontScaling: PropTypes.bool,
  backLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,  
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

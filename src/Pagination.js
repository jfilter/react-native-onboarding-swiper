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
  showDone,
  onDone,
  DoneButtonComponent,
  DotComponent,
}) => {
  const isLastPage = currentPage + 1 === numPages;

  const DoneButtonFinal = showDone &&
    isLastPage && (
      <DoneButtonComponent
        isLight={isLight}
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

  const renderDots = !isLastPage && (
    <Dots
      isLight={isLight}
      numPages={numPages}
      currentPage={currentPage}
      Dot={DotComponent}
      style={styles.dots}
    />
  );

  return (
    <View
      style={{
        height: bottomBarHeight,
        ...styles.container,
      }}
    >
      {renderDots}
      <View style={styles.buttonRight}>{DoneButtonFinal}</View>
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
  onNext: PropTypes.func.isRequired,
  onSkip: PropTypes.func,
  onDone: PropTypes.func,
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
    flexDirection: 'column',
    justifyContent: 'center',
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
    alignItems: 'center',
  },
  dots: {
    flexShrink: 0,
  },
};

export default Pagination;

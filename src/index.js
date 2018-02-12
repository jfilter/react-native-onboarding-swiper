import { Animated, Dimensions, FlatList, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import tinycolor from 'tinycolor2';

import Page from './Page';
import Pagination from './Pagination';
import Dot from './Dot';
import TextButton from './TextButton';
import SymbolButton from './SymbolButton';

// hotfix: https://github.com/facebook/react-native/issues/16710
const itemVisibleHotfix = { itemVisiblePercentThreshold: 100 };

class Onboarding extends Component {
  constructor() {
    super();

    this.state = {
      currentPage: 0,
      previousPage: null,
      width: null,
      height: null,
      backgroundColorAnim: new Animated.Value(0),
    };
  }

  componentDidUpdate() {
    Animated.timing(this.state.backgroundColorAnim, {
      toValue: 1,
      duration: 500,
    }).start();
  }

  onSwipePageChange = ({ viewableItems }) => {
    if (!viewableItems[0] || this.state.currentPage === viewableItems[0].index)
      return;

    this.setState(state => {
      return {
        previousPage: state.currentPage,
        currentPage: viewableItems[0].index,
        backgroundColorAnim: new Animated.Value(0),
      };
    });
  };

  goNext = () => {
    this.flatList.scrollToIndex({
      animated: true,
      index: this.state.currentPage + 1,
    });
  };

  _onLayout = () => {
    const { width, height } = Dimensions.get('window');
    this.setState({ width, height });
  };

  keyExtractor = (item, index) => index;

  renderItem = ({ item }) => {
    const { image, title, subtitle, backgroundColor } = item;
    const isLight = tinycolor(backgroundColor).getBrightness() > 180;

    return (
      <Page
        isLight={isLight}
        image={image}
        title={title}
        subtitle={subtitle}
        width={this.state.width || Dimensions.get('window').width}
        height={this.state.height || Dimensions.get('window').height}
      />
    );
  };

  render() {
    const {
      pages,
      alterBottomColor,
      showSkip,
      showNext,
      showDone,
      onSkip,
      onDone,
      skipLabel,
      SkipButtonComponent,
      DoneButtonComponent,
      NextButtonComponent,
      PaginationDotComponent,
    } = this.props;
    const currentPage = pages[this.state.currentPage];
    const currentBackgroundColor = currentPage.backgroundColor;
    const isLight = tinycolor(currentBackgroundColor).getBrightness() > 180;
    const barStyle = isLight ? 'dark-content' : 'light-content';
    StatusBar.setBarStyle(barStyle);

    let backgroundColor = currentBackgroundColor;
    if (this.state.previousPage !== null) {
      const previousBackgroundColor =
        pages[this.state.previousPage].backgroundColor;
      backgroundColor = this.state.backgroundColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [previousBackgroundColor, currentBackgroundColor],
      });
    }

    return (
      <Animated.View
        onLayout={this._onLayout}
        style={{
          flex: 1,
          backgroundColor,
          justifyContent: 'center',
        }}
      >
        <FlatList
          ref={list => {
            this.flatList = list;
          }}
          data={pages}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          onViewableItemsChanged={this.onSwipePageChange}
          viewabilityConfig={itemVisibleHotfix}
          initialNumToRender={1}
          extraData={
            this.state.width // ensure that the list re-renders on orientation change
          }
        />
        <Pagination
          isLight={isLight}
          alterBottomColor={alterBottomColor}
          showSkip={showSkip}
          showNext={showNext}
          showDone={showDone}
          numPages={pages.length}
          currentPage={this.state.currentPage}
          onSkip={onSkip}
          onDone={onDone}
          onNext={this.goNext}
          skipLabel={skipLabel}
          SkipButton={SkipButtonComponent}
          DoneButton={DoneButtonComponent}
          NextButton={NextButtonComponent}
          Dot={PaginationDotComponent}
        />
      </Animated.View>
    );
  }
}

Onboarding.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      backgroundColor: PropTypes.string.isRequired,
      image: PropTypes.element.isRequired,
      title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.func,
      ]).isRequired,
      subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
    })
  ).isRequired,
  alterBottomColor: PropTypes.bool,
  showSkip: PropTypes.bool,
  showNext: PropTypes.bool,
  showDone: PropTypes.bool,
  onSkip: PropTypes.func,
  onDone: PropTypes.func,
  skipLabel: PropTypes.string,
  SkipButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  DoneButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  NextButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  PaginationDotComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]),
};

Onboarding.defaultProps = {
  alterBottomColor: true,
  showSkip: true,
  showNext: true,
  showDone: true,
  skipLabel: 'Skip',
  onSkip: null,
  onDone: null,
  SkipButtonComponent: TextButton,
  DoneButtonComponent: SymbolButton,
  NextButtonComponent: SymbolButton,
  PaginationDotComponent: Dot,
};

export default Onboarding;

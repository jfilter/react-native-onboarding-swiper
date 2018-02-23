import { Animated, Dimensions, FlatList, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import tinycolor from 'tinycolor2';

import Page from './Page';
import Pagination from './Pagination';
import Dot from './Dot';
import SkipButton from './buttons/SkipButton';
import NextButton from './buttons/NextButton';
import DoneButton from './buttons/DoneButton';

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
      gone: false,
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
      bottomBarHeight,
      bottomBarHighlight,
      showSkip,
      showNext,
      showDone,
      onSkip,
      onDone,
      skipLabel,
      nextLabel,
      SkipButtonComponent,
      DoneButtonComponent,
      NextButtonComponent,
      DotComponent,
    } = this.props;
    const currentPage = pages[this.state.currentPage];
    const currentBackgroundColor = currentPage.backgroundColor;
    const isLight = tinycolor(currentBackgroundColor).getBrightness() > 180;
    const barStyle = isLight ? 'dark-content' : 'light-content';

    let backgroundColor = currentBackgroundColor;
    if (this.state.previousPage !== null) {
      const previousBackgroundColor =
        pages[this.state.previousPage].backgroundColor;
      backgroundColor = this.state.backgroundColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [previousBackgroundColor, currentBackgroundColor],
      });
    }

    if (alterBottomColor !== undefined) {
      console.warn(
        'The prop alterBottomColor on react-native-onboarding-swiper is depricated and will be removed soon. Use `bottomBarHighlight` instead.'
      );
    }

    return (
      <Animated.View
        onLayout={this._onLayout}
        style={{ flex: 1, backgroundColor, justifyContent: 'center' }}
      >
        <StatusBar barStyle={this.state.gone ? 'default' : barStyle} />
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
          gone={() => this.setState({ gone: true })}
          isLight={isLight}
          bottomBarHighlight={bottomBarHighlight || alterBottomColor}
          bottomBarHeight={bottomBarHeight}
          showSkip={showSkip}
          showNext={showNext}
          showDone={showDone}
          numPages={pages.length}
          currentPage={this.state.currentPage}
          onSkip={onSkip}
          onDone={onDone}
          onNext={this.goNext}
          skipLabel={skipLabel}
          nextLabel={nextLabel}
          SkipButtonComponent={SkipButtonComponent}
          DoneButtonComponent={DoneButtonComponent}
          NextButtonComponent={NextButtonComponent}
          DotComponent={DotComponent}
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
  bottomBarHighlight: PropTypes.bool,
  bottomBarHeight: PropTypes.number,
  showSkip: PropTypes.bool,
  showNext: PropTypes.bool,
  showDone: PropTypes.bool,
  onSkip: PropTypes.func,
  onDone: PropTypes.func,
  skipLabel: PropTypes.string,
  nextLabel: PropTypes.string,
  SkipButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  DoneButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  NextButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  DotComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

Onboarding.defaultProps = {
  bottomBarHighlight: true,
  bottomBarHeight: 60,
  showSkip: true,
  showNext: true,
  showDone: true,
  skipLabel: 'Skip',
  nextLabel: 'Next',
  onSkip: null,
  onDone: null,
  SkipButtonComponent: SkipButton,
  DoneButtonComponent: DoneButton,
  NextButtonComponent: NextButton,
  DotComponent: Dot,
};

export default Onboarding;

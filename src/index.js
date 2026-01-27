import {
  Animated,
  Dimensions,
  FlatList,
  I18nManager,
  Platform,
  StatusBar,
  SafeAreaView,
  View,
} from 'react-native';

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
const itemVisibleHotfix = { itemVisiblePercentThreshold: 99 };

class Onboarding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      previousPage: null,
      width: null,
      height: null,
      backgroundColorAnim: new Animated.Value(0),
    };

    this._dragStartOffset = 0;
  }

  componentDidUpdate() {
    Animated.timing(this.state.backgroundColorAnim, {
      toValue: 1,
      duration: this.props.transitionAnimationDuration,
      useNativeDriver: false,
    }).start();
  }

  onSwipePageChange = ({ viewableItems }) => {
    if (!viewableItems[0] || this.state.currentPage === viewableItems[0].index)
      return;

    const targetIndex = viewableItems[0].index;
    const currentPage = this.props.pages[this.state.currentPage];
    const isRTLiOS = I18nManager.isRTL && Platform.OS === 'ios';
    const isForward = isRTLiOS
      ? targetIndex < this.state.currentPage
      : targetIndex > this.state.currentPage;

    if (isForward && currentPage.canSwipeForward === false) return;
    if (!isForward && currentPage.canSwipeBackward === false) return;

    this.setState((state) => {
      this.props.pageIndexCallback &&
        this.props.pageIndexCallback(viewableItems[0].index);
      return {
        previousPage: state.currentPage,
        currentPage: viewableItems[0].index,
        backgroundColorAnim: new Animated.Value(0),
      };
    });
  };

  goNext = () => {
    const currentPage = this.props.pages[this.state.currentPage];
    if (currentPage.canSwipeForward === false) return;

    this.props.onNext && this.props.onNext();
    this.flatList.scrollToIndex({
      animated: true,
      index:
        I18nManager.isRTL && Platform.OS == 'ios'
          ? this.state.currentPage - 1
          : this.state.currentPage + 1,
    });
  };

  goToPage = (index, animated=true) => {
    this.flatList.scrollToIndex({
      index,
      animated,
    });
  };

  _onLayout = () => {
    const { width, height } = Dimensions.get('window');
    this.setState({ width, height });
  };

  keyExtractor = (item, index) => index.toString();

  onScrollBeginDrag = (e) => {
    this._dragStartOffset = e.nativeEvent.contentOffset.x;
  };

  onScroll = (e) => {
    const currentX = e.nativeEvent.contentOffset.x;
    const delta = currentX - this._dragStartOffset;
    const currentPage = this.props.pages[this.state.currentPage];
    const isRTLiOS = I18nManager.isRTL && Platform.OS === 'ios';

    // In RTL on iOS, scrolling left (negative delta) means forward
    const isForwardDrag = isRTLiOS ? delta < 0 : delta > 0;

    if (isForwardDrag && currentPage.canSwipeForward === false) {
      this.flatList.scrollToIndex({ index: this.state.currentPage, animated: false });
    } else if (!isForwardDrag && delta !== 0 && currentPage.canSwipeBackward === false) {
      this.flatList.scrollToIndex({ index: this.state.currentPage, animated: false });
    }
  };

  renderItem = ({ item }) => {
    const { image, title, subtitle, backgroundColor, background, isLight: pageLightOverride } = item;
    const isLight =
      pageLightOverride !== undefined
        ? pageLightOverride
        : backgroundColor
          ? tinycolor(backgroundColor).getBrightness() > 180
          : false;
    const {
      containerStyles,
      imageContainerStyles,
      allowFontScalingText,
      titleStyles,
      subTitleStyles,
    } = this.props;

    return (
      <Page
        isLight={isLight}
        image={image}
        title={title}
        subtitle={subtitle}
        background={background}
        width={this.state.width || Dimensions.get('window').width}
        height={this.state.height || Dimensions.get('window').height}
        containerStyles={containerStyles}
        imageContainerStyles={imageContainerStyles}
        allowFontScaling={allowFontScalingText}
        titleStyles={Object.assign(
          {},
          titleStyles || {},
          item.titleStyles || {}
        )}
        subTitleStyles={Object.assign(
          {},
          subTitleStyles || {},
          item.subTitleStyles || {}
        )}
      />
    );
  };

  render() {
    const {
      pages,
      alterBottomColor,
      bottomBarHeight,
      bottomBarColor,
      controlStatusBar,
      showSkip,
      showNext,
      showDone,
      showPagination,
      onSkip,
      onDone,
      skipLabel,
      nextLabel,
      doneLabel,
      allowFontScalingButtons,
      SkipButtonComponent,
      DoneButtonComponent,
      NextButtonComponent,
      DotComponent,
      flatlistProps,
      skipToPage,
    } = this.props;
    const currentPage = pages[this.state.currentPage];
    const currentBackgroundColor = currentPage.backgroundColor || 'transparent';
    const resolvedNextLabel = currentPage.nextLabel != null ? currentPage.nextLabel : nextLabel;
    const resolvedSkipLabel = currentPage.skipLabel != null ? currentPage.skipLabel : skipLabel;
    const resolvedDoneLabel = currentPage.doneLabel != null ? currentPage.doneLabel : doneLabel;
    const resolvedCanSwipeForward = currentPage.canSwipeForward !== false;
    const resolvedCanSwipeBackward = currentPage.canSwipeBackward !== false;
    const isLight =
      currentPage.isLight !== undefined
        ? currentPage.isLight
        : currentPage.backgroundColor
          ? tinycolor(currentPage.backgroundColor).getBrightness() > 180
          : false;
    const barStyle = isLight ? 'dark-content' : 'light-content';
    const bottomBarHighlight =
      alterBottomColor !== undefined
        ? alterBottomColor
        : this.props.bottomBarHighlight;

    let backgroundColor = currentBackgroundColor;
    if (
      this.state.previousPage !== null &&
      pages[this.state.previousPage] !== undefined
    ) {
      const previousPage = pages[this.state.previousPage];
      const canInterpolate =
        previousPage.backgroundColor &&
        currentPage.backgroundColor &&
        !previousPage.background &&
        !currentPage.background;
      if (canInterpolate) {
        backgroundColor = this.state.backgroundColorAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [previousPage.backgroundColor, currentPage.backgroundColor],
        });
      }
    }

    if (alterBottomColor !== undefined) {
      console.warn(
        'The prop alterBottomColor on react-native-onboarding-swiper is deprecated and will be removed soon. Use `bottomBarHighlight` instead.'
      );
    }

    const skipFun = !resolvedCanSwipeForward
      ? null
      : skipToPage != null
        ? () => {
            this.flatList.scrollToIndex({
              animated: true,
              index: skipToPage,
            });
          }
        : onSkip;

    const windowWidth = Dimensions.get('window').width;

    return (
      <Animated.View
        onLayout={this._onLayout}
        style={{ flex: 1, backgroundColor, justifyContent: 'center' }}
      >
        {controlStatusBar && <StatusBar barStyle={barStyle} />}
        <FlatList
          ref={(list) => {
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
          getItemLayout={(_data, index) => (
            {length: windowWidth, offset: windowWidth * index, index}
          )}
          extraData={
            this.state.width // ensure that the list re-renders on orientation change
          }
          scrollEnabled={resolvedCanSwipeForward || resolvedCanSwipeBackward}
          onScrollBeginDrag={this.onScrollBeginDrag}
          onScroll={this.onScroll}
          scrollEventThrottle={16}
          {...flatlistProps}
        />
        {showPagination && (
          <SafeAreaView style={bottomBarHighlight ? styles.overlay : {}}>
            <Pagination
              isLight={isLight}
              bottomBarHeight={bottomBarHeight}
              bottomBarColor={bottomBarColor}
              showSkip={showSkip}
              showNext={showNext}
              showDone={showDone}
              numPages={pages.length}
              currentPage={this.state.currentPage}
              onSkip={skipFun}
              onDone={onDone}
              onNext={this.goNext}
              skipLabel={resolvedSkipLabel}
              nextLabel={resolvedNextLabel}
              doneLabel={resolvedDoneLabel}
              allowFontScaling={allowFontScalingButtons}
              SkipButtonComponent={SkipButtonComponent}
              DoneButtonComponent={DoneButtonComponent}
              NextButtonComponent={NextButtonComponent}
              DotComponent={DotComponent}
              canSwipeForward={resolvedCanSwipeForward}
            />
          </SafeAreaView>
        )}
      </Animated.View>
    );
  }
}

Onboarding.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      backgroundColor: PropTypes.string,
      background: PropTypes.element,
      isLight: PropTypes.bool,
      image: PropTypes.element.isRequired,
      title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.func,
      ]).isRequired,
      subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
      nextLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
      skipLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
      doneLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
      canSwipeForward: PropTypes.bool,
      canSwipeBackward: PropTypes.bool,
    })
  ).isRequired,
  bottomBarHighlight: PropTypes.bool,
  bottomBarHeight: PropTypes.number,
  bottomBarColor: PropTypes.string,
  controlStatusBar: PropTypes.bool,
  showSkip: PropTypes.bool,
  showNext: PropTypes.bool,
  showDone: PropTypes.bool,
  showPagination: PropTypes.bool,
  onSkip: PropTypes.func,
  onDone: PropTypes.func,
  onNext: PropTypes.func,
  skipLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  nextLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  doneLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  SkipButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  DoneButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  NextButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  DotComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  containerStyles: PropTypes.shape({
    style: PropTypes.any,
  }),
  imageContainerStyles: PropTypes.shape({
    style: PropTypes.any,
  }),
  allowFontScalingText: PropTypes.bool,
  allowFontScalingButtons: PropTypes.bool,
  titleStyles: PropTypes.shape({
    style: PropTypes.any,
  }),
  subTitleStyles: PropTypes.shape({
    style: PropTypes.any,
  }),
  transitionAnimationDuration: PropTypes.number,
  skipToPage: PropTypes.number,
  pageIndexCallback: PropTypes.func,
};

Onboarding.defaultProps = {
  bottomBarHighlight: true,
  bottomBarHeight: 60,
  bottomBarColor: 'transparent',
  controlStatusBar: true,
  showPagination: true,
  showSkip: true,
  showNext: true,
  showDone: true,
  skipLabel: 'Skip',
  nextLabel: 'Next',
  doneLabel: null,
  onSkip: null,
  onDone: null,
  onNext: null,
  SkipButtonComponent: SkipButton,
  DoneButtonComponent: DoneButton,
  NextButtonComponent: NextButton,
  DotComponent: Dot,
  containerStyles: null,
  imageContainerStyles: null,
  allowFontScalingText: true,
  allowFontScalingButtons: true,
  titleStyles: null,
  subTitleStyles: null,
  transitionAnimationDuration: 500,
  skipToPage: null,
  pageIndexCallback: null,
};

const styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
};

export default Onboarding;

import { FlatList, StatusBar, View } from 'react-native';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import tinycolor from 'tinycolor2';

import Page from './Page';
import Pagination from './Pagination';

class Onboarding extends Component {
  constructor() {
    super();

    this.state = {
      currentPage: 0,
    };
  }

  onSwipePageChange = ({ viewableItems }) => {
    if (viewableItems[0]) {
      this.setState({ currentPage: viewableItems[0].index });
    }
  };

  goNext = () => {
    this.flatList.scrollToIndex({
      animated: true,
      index: this.state.currentPage + 1,
    });
  };

  keyExtractor = (item, index) => index;

  renderItem = ({ item }) => {
    const { image, title, subtitle, backgroundColor } = item;
    const isLight = tinycolor(backgroundColor).getBrightness() > 180;
    return (
      <Page isLight={isLight} image={image} title={title} subtitle={subtitle} />
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
    } = this.props;
    const currentPage = pages[this.state.currentPage];
    const { backgroundColor } = currentPage;
    const isLight = tinycolor(backgroundColor).getBrightness() > 180;
    const barStyle = isLight ? 'dark-content' : 'light-content';
    StatusBar.setBarStyle(barStyle);

    return (
      <View
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
          viewabilityConfig={{
            itemVisiblePercentThreshold: 100,
          }}
          initialNumToRender={1}
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
        />
      </View>
    );
  }
}

Onboarding.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      backgroundColor: PropTypes.string.isRequired,
      image: PropTypes.element.isRequired,
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
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
};

Onboarding.defaultProps = {
  alterBottomColor: true,
  showSkip: true,
  showNext: true,
  showDone: true,
  skipLabel: 'Skip',
};

export default Onboarding;

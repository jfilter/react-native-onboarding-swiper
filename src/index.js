import { Dimensions, FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import tinycolor from 'tinycolor2';

import PageData from './PageData';
import Paginator from './Paginator';

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

  renderItem = ({ item, index }) => {
    const { image, title, subtitle, backgroundColor } = item;
    const { width, height } = Dimensions.get('window');
    const isLight = tinycolor(backgroundColor).getBrightness() > 180;

    return (
      <PageData
        key={index}
        isLight={isLight}
        image={image}
        title={title}
        subtitle={subtitle}
        width={width}
        height={height}
      />
    );
  };

  render() {
    const { pages, bottomOverlay, showSkip, showNext, showDone } = this.props;
    const currentPage = pages[this.state.currentPage];
    const { backgroundColor } = currentPage;
    const isLight = tinycolor(backgroundColor).getBrightness() > 180;

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
          onViewableItemsChanged={this.onSwipePageChange}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 100,
          }}
        />
        <Paginator
          isLight={isLight}
          overlay={bottomOverlay}
          showSkip={showSkip}
          showNext={showNext}
          showDone={showDone}
          pages={pages.length}
          currentPage={this.state.currentPage}
          onEnd={this.props.onEnd}
          onNext={this.goNext}
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
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
    })
  ).isRequired,
  bottomOverlay: PropTypes.bool,
  showSkip: PropTypes.bool,
  showNext: PropTypes.bool,
  showDone: PropTypes.bool,
  onEnd: PropTypes.funtion,
};

Onboarding.defaultProps = {
  bottomOverlay: true,
  showSkip: true,
  showNext: true,
  showDone: true,
  onEnd: null,
};

export default Onboarding;

import { FlatList, View } from 'react-native';
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
    const isLight = tinycolor(backgroundColor).getBrightness() > 180;

    return (
      <PageData
        key={index}
        isLight={isLight}
        image={image}
        title={title}
        subtitle={subtitle}
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
          numPages={pages.length}
          currentPage={this.state.currentPage}
          onSkip={this.props.onSkip}
          onDone={this.props.onDone}
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
  onSkip: PropTypes.funtion,
  onDone: PropTypes.funtion,
};

Onboarding.defaultProps = {
  bottomOverlay: true,
  showSkip: true,
  showNext: true,
  showDone: true,
};

export default Onboarding;

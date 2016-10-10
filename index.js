import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Text, TouchableOpacity } from 'react-native';

import PageData from './components/PageData';
import Paginator from './components/Paginator';

export default class Onboarder extends Component {
  constructor() {
    super();

    this.state = {
      currentPage: 0,
    };
  }

  updatePosition = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const pageFraction = contentOffset.x / layoutMeasurement.width;
    const page = Math.round(pageFraction);
    const isLastPage = this.props.pages.length === page + 1;
    if (isLastPage && pageFraction - page > 0.3) {
      this.props.onEnd();
    } else {
      this.setState({ currentPage: page });
    }
  };

  goNext = () => {
    const { width } = Dimensions.get('window');
    const { currentPage } = this.state;
    const nextPage = currentPage + 1;
    const offsetX = nextPage * width;
    this.refs.scroll.scrollTo({ x: offsetX, animated: true });
    this.setState({ currentPage: nextPage });
  };

  render() {
    const { width, height } = Dimensions.get('window');
    const currentPage = this.props.pages[this.state.currentPage] || this.props.pages[0];

    return (
      <View style={{ flex: 1, backgroundColor: currentPage.backgroundColor, justifyContent: 'center' }}>
        <ScrollView
          ref="scroll"
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={this.updatePosition}
          scrollEventThrottle={100}
        >
          {this.props.pages.map(({ image, title, subtitle }, idx) => (
            <PageData key={idx} image={image} title={title} subtitle={subtitle} width={width} height={height} />
          ))}
        </ScrollView>
        <Paginator
          pages={this.props.pages.length}
          currentPage={this.state.currentPage}
          onEnd={this.props.onEnd}
          onNext={this.goNext}
        />
      </View>
    );
  }
}


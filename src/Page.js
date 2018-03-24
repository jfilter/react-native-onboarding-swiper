import { Dimensions, Text, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

const Page = ({
  isLight,
  image,
  title,
  subtitle,
  width,
  height,
  imageContainerStyles,
}) => {
  let titleElement = title;
  if (typeof title === 'string' || title instanceof String) {
    titleElement = (
      <View style={styles.padding}>
        <Text style={[styles.title, isLight ? styles.titleLight : {}]}>
          {title}
        </Text>
      </View>
    );
  }

  let subtitleElement = subtitle;
  if (typeof subtitle === 'string' || subtitle instanceof String) {
    subtitleElement = (
      <View style={styles.padding}>
        <Text style={[styles.subtitle, isLight ? styles.subtitleLight : {}]}>
          {subtitle}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { width, height }]}>
      <View style={[styles.imageContainer, imageContainerStyles]}>{image}</View>
      {titleElement}
      {subtitleElement}
    </View>
  );
};

Page.propTypes = {
  isLight: PropTypes.bool.isRequired,
  image: PropTypes.element.isRequired,
  imageContainerStyles: ViewPropTypes.style,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

Page.defaultProps = {
  imageContainerStyles: null,
};

const { width, height } = Dimensions.get('window');
const potrait = height > width;

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: potrait ? 'center' : 'flex-start',
    paddingTop: potrait ? 0 : 10,
  },
  imageContainer: {
    flex: 0,
    paddingBottom: potrait ? 60 : 10,
    alignItems: 'center',
    width: '100%',
  },
  padding: {
    paddingHorizontal: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 26,
    color: '#fff',
    paddingBottom: 15,
  },
  titleLight: {
    color: '#000',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  subtitleLight: {
    color: 'rgba(0, 0, 0, 0.7)',
  },
};

export default Page;

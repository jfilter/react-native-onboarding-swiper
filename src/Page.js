import { Dimensions, Text, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const Page = ({ isLight, image, title, subtitle }) => {
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
    <View style={styles.container}>
      <View style={styles.image}>{image}</View>
      {titleElement}
      {subtitleElement}
    </View>
  );
};

Page.propTypes = {
  isLight: PropTypes.bool.isRequired,
  image: PropTypes.element.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
};

const { width, height } = Dimensions.get('window');

const styles = {
  container: {
    height,
    width,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 0,
    paddingBottom: 60,
    alignItems: 'center',
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

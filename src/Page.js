import { Dimensions, Text, View, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'

const Page = ({
  isLight,
  image,
  title,
  subtitle,
  width,
  height,
  containerStyles,
  imageContainerStyles,
  allowFontScaling,
  titleStyles,
  subTitleStyles,
  customScreen,
}) => {
  let titleElement = title
  if (typeof title === 'string' || title instanceof String) {
    titleElement = (
      <View style={styles.padding}>
        <Text
          allowFontScaling={allowFontScaling}
          style={[styles.title, isLight ? styles.titleLight : {}, titleStyles]}
        >
          {title}
        </Text>
      </View>
    )
  }

  let subtitleElement = subtitle
  if (typeof subtitle === 'string' || subtitle instanceof String) {
    subtitleElement = (
      <View style={styles.padding}>
        <Text
          allowFontScaling={allowFontScaling}
          style={[styles.subtitle, isLight ? styles.subtitleLight : {}, subTitleStyles]}
        >
          {subtitle}
        </Text>
      </View>
    )
  }

  return (
    <View style={[styles.container, containerStyles, { width, height }]}>
      {customScreen || (
        <>
          <View style={[styles.imageContainer, imageContainerStyles]}>{image}</View>
          {titleElement}
          {subtitleElement}
        </>
      )}
    </View>
  )
}

Page.propTypes = {
  customScreen: PropTypes.element,
  isLight: PropTypes.bool.isRequired,
  image: PropTypes.element.isRequired,
  containerStyles: ViewPropTypes.style,
  imageContainerStyles: ViewPropTypes.style,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  allowFontScaling: PropTypes.bool,
  titleStyles: Text.propTypes.style,
  subTitleStyles: Text.propTypes.style,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

Page.defaultProps = {
  customScreen: null,
  containerStyles: null,
  imageContainerStyles: null,
  allowFontScaling: true,
  titleStyles: null,
  subTitleStyles: null,
}

const { width, height } = Dimensions.get('window')
const potrait = height > width

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: potrait ? 'center' : 'flex-start',
    paddingTop: potrait ? 0 : 10,
  },
  imageContainer: { flex: 0, paddingBottom: potrait ? 60 : 10, alignItems: 'center', width: '100%' },
  padding: { paddingHorizontal: 10 },
  title: { textAlign: 'center', fontSize: 26, color: '#fff', paddingBottom: 15 },
  titleLight: { color: '#000' },
  subtitle: { textAlign: 'center', fontSize: 16, color: 'rgba(255, 255, 255, 0.7)' },
  subtitleLight: { color: 'rgba(0, 0, 0, 0.7)' },
}

export default Page

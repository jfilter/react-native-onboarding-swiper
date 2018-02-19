import { Image, View } from 'react-native';
import React from 'react';
import { Button, Icon } from 'react-native-elements';

import Onboarding from 'react-native-onboarding-swiper';

const Square = ({ isLight, selected }) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
  } else {
    backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
  }
  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const NextButton = () => (
  <Button
    title={'Get Started'}
    containerViewStyle={{ marginTop: 20 }}
    // backgroundColor={'white'}
    // borderRadius={5}
    textStyle={{ color: '#003c8f' }}
    onPress={() => {
      Alert.alert('done');
      StatusBar.setBarStyle('default');
    }}
  />
);

const CustomButtons = () => (
  <Onboarding
    DotComponent={Square}
    pages={[
      {
        backgroundColor: '#fff',
        image: <Image source={require('./images/circle.png')} />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#fe6e58',
        image: <Image source={require('./images/square.png')} />,
        title: 'The Title',
        subtitle: 'This is the subtitle that sumplements the title.',
      },
      {
        backgroundColor: '#999',
        image: <Image source={require('./images/triangle.png')} />,
        title: 'Triangle',
        subtitle: "Beautiful, isn't it?",
      },
    ]}
  />
);

export default CustomButtons;

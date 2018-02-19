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

const Done = ({ ...props }) => (
  <Button
    title={'Get Started'}
    containerViewStyle={{ marginTop: 20 }}
    textStyle={{ color: '#003c8f' }}
    {...props}
  />
);

const Skip = ({ skipLabel, ...props }) => (
  <Button
    title={'Skip'}
    containerViewStyle={{ marginTop: 20 }}
    // backgroundColor={'white'}
    // borderRadius={5}
    textStyle={{ color: '#003c8f' }}
    {...props}
  >
    {skipLabel}
  </Button>
);

const Next = ({ ...props }) => (
  <Button
    title={'Next'}
    containerViewStyle={{ marginTop: 20 }}
    // backgroundColor={'white'}
    // borderRadius={5}
    textStyle={{ color: '#003c8f' }}
    {...props}
  />
);

const CustomButtons = () => (
  <Onboarding
    DotComponent={Square}
    NextButtonComponent={Next}
    SkipButtonComponent={Skip}
    DoneButtonComponent={Done}
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

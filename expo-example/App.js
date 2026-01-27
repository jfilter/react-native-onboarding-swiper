import React from 'react';
import { View } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

export default function App() {
  return (
    <Onboarding
      controlStatusBar={false}
      onDone={() => alert('Done!')}
      onSkip={() => alert('Skipped!')}
      pages={[
        {
          backgroundColor: '#4A90D9',
          image: <View style={{ width: 150, height: 150, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 75 }} />,
          title: 'Welcome to the App',
          subtitle: 'This is page one with a longer subtitle to test text wrapping behavior',
        },
        {
          backgroundColor: '#E8744F',
          image: <View style={{ width: 150, height: 150, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 75 }} />,
          title: 'Stay Organized',
          subtitle: 'Keep everything in one place and never miss a thing',
        },
        {
          backgroundColor: '#59B390',
          image: <View style={{ width: 150, height: 150, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 75 }} />,
          title: 'Get Started Now',
          subtitle: 'You are all set. Tap done to continue!',
        },
      ]}
    />
  );
}

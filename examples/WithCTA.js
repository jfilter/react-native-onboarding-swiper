import { Alert, StatusBar } from 'react-native';
import React from 'react';

import { Button, Icon } from 'react-native-elements';
import Onboarding from 'react-native-onboarding-swiper';

const WithCTA = () => (
  <Onboarding
    showDone={false}
    onSkip={() => Alert.alert('Skipped')}
    pages={[
      {
        title: 'Hey!',
        subtitle: 'Welcome to $App!',
        backgroundColor: '#003c8f',
        image: (
          <Icon
            name="hand-peace-o"
            type="font-awesome"
            size={100}
            color="white"
          />
        ),
      },
      {
        title: 'Send Messages',
        subtitle: 'You can reach everybody with us',
        backgroundColor: '#5e92f3',
        image: (
          <Icon
            name="paper-plane-o"
            type="font-awesome"
            size={100}
            color="white"
          />
        ),
      },
      {
        title: 'Get Notified',
        subtitle: 'We will send you notification as soon as something happened',
        backgroundColor: '#1565c0',
        image: (
          <Icon name="bell-o" type="font-awesome" size={100} color="white" />
        ),
      },
      {
        title: "That's Enough",
        subtitle: (
          <Button
            title={'Get Started'}
            containerViewStyle={{ marginTop: 20 }}
            backgroundColor={'white'}
            borderRadius={5}
            textStyle={{ color: '#003c8f' }}
            onPress={() => {
              Alert.alert('done');
              StatusBar.setBarStyle('default');
            }}
          />
        ),
        backgroundColor: '#003c8f',
        image: (
          <Icon name="rocket" type="font-awesome" size={100} color="white" />
        ),
      },
    ]}
  />
);

export default WithCTA;

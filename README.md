# `<Onboarding />`

Onboarding experience made a breeze.

Originally inspired by [AndroidOnboarder](https://github.com/chyrta/AndroidOnboarder).

## Quick demo

| ![](images/1.png) | ![](images/2.png) | ![](images/3.png) |
| --- | --- | --- |

```javascript
<Onboarding
  pages={[
    { backgroundColor: '#1060fe', image: <Square />, title: 'Simple Messenger UI', subtitle: 'Implemented in React Native' },
    { backgroundColor: "#fe6e58", image: <Circle />, title: 'Welcome', subtitle: 'To Earth' },
    { backgroundColor: "#999", image: <Square />, title: 'Also', subtitle: 'Mars is nice' },
  ]}
  onEnd={}
/>
```

## Install

```
npm install --save react-native-simple-onboarding
```

```javascript
import Onboarding from 'react-native-simple-onboarding';
```

## Usage

## `<Onboarding />`

Props:

* `pages`: an array of onboarding pages. A page is an object of shape:
  * `backgroundColor` (required): a background color for the page
  * `image` (required): a component instance displayed at the top of the page
  * `title` (required): a string title
  * `subtitle` (required): a string subtitle
* `onEnd`: a callback that is fired after the onboarding is complete

## To Do

* animations
* accessibility

## License

MIT.

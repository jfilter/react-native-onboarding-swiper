# `<Onboarding />`

| ![](demo/simple1.png) | ![](demo/simple2.png) | ![](demo/simple3.png) |
| --- | --- | --- |

Delightful Onboarding for your React-Native app. Let your users get familar with your app by giving a pleasurable introduction. The Onboarding component is easy to set up and but still customizable.

## Install

```
npm i react-native-onboarding-swiper
```

```js
import Onboarding from 'react-native-onboarding-swiper';
```

## Usage

```js
<Onboarding
  pages={[
    {
      backgroundColor: '#fff',
      image: <Image source={require('./images/circle.png')} />,
      title: 'Onboarding',
      subtitle: 'Done with React Native Onboarding Swiper',
    },
    ...
  ]}
/>
```

Check out the [simple example](examples/Simple.js) and the [example with a Call-to-Action button](examples/WithCTA.js).

## Properties

* `pages` (required): an array of pages in the following shape:
  * `backgroundColor` (required): a background color. The color of the font and dots adapts to the background color.
  * `image` (required): a component (e.g. `<Image />`) to display at the top of the page.
  * `title` (required): a string **OR** a React-Native component.
  * `subtitle` (required): a string **OR** a React-Native component.
* `onSkip` (optional): a callback that is fired if the Onboarding is skipped.
* `onDone` (optional): a callback that is fired after the Onboarding is completed.
* `alterBottomColor` (optional): a bool flag indicating whether the color in the bottom of the page should be altered/changed. Defaults to `true`.
* `showSkip` (optional): a bool flag indicating whether the Skip button should be show. Defaults to `true`.
* `showNext` (optional): a bool flag indicating whether the Next arrow button should be show. Defaults to `true`.
* `showDone` (optional): a bool flag indicating whether the Done checkmark button should be show. Defaults to `true`.
* `skipLabel` (optional): a string for the Skip label. Defaults to `Skip`.

## Contributing

If you have a **question**, found a **bug** or want to propose a new **feature**, have a look at the [issues page](https://github.com/jfilter/react-native-onboarding-swiper/issues).

**Pull requests** are especially welcomed when they fix bugs or improve the code quality.


## Acknowledgements
Built upon the work by [Gosha Arinich](https://github.com/goshakkk/react-native-simple-onboarding) which was originally inspired by [AndroidOnboarder](https://github.com/chyrta/AndroidOnboarder).


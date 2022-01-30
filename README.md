# `<Onboarding />` [![npm](https://img.shields.io/npm/v/react-native-onboarding-swiper.svg)](https://www.npmjs.com/package/react-native-onboarding-swiper) [![npm](https://img.shields.io/npm/dm/react-native-onboarding-swiper.svg)](https://www.npmjs.com/package/react-native-onboarding-swiper)

| ![](demo/simple1.png) | ![](demo/simple2.png) | ![](demo/demo.gif) |
| --------------------- | --------------------- | ------------------ |


There are many ways to onboard people to your mobile app. But for React-Native, there is solely _one_ component that is a) **easy to setup** and b) **highly customizable**:
`react-native-onboarding-swiper`.

Your new users shouldn't jump in at the deep end. First give them a pleasurable, delightful introduction and only then let them explore your awesome app.

Getting everything running merely takes a minute. Try out the example [running in your browser](https://snack.expo.io/dlQTGD06P). Or check out this [tutorial on YouTube](https://www.youtube.com/watch?v=SMkR-iIGvwQ).

## Install

```bash
npm i react-native-onboarding-swiper
```

```bash
yarn add react-native-onboarding-swiper
```

## Usage

```js
import Onboarding from 'react-native-onboarding-swiper';

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

## Examples

Check out the three examples files: the [simple example](examples/Simple.js), the [example with a Call-to-Action button](examples/WithCTA.js) or the [example with custom button components](examples/CustomButtons.js).

## Required Properties

* `pages` (required): an array of pages in the following shape:
  * `backgroundColor` (required): a background color. The color of the font and dots adapts to the background color.
  * `image` (required): a component (e.g. `<Image />`) to display at the top of the page.
  * `title` (required): a string **OR** a React-Native component.
  * `subtitle` (required): a string **OR** a React-Native component.

## Optional Properties

### Buttons

* `nextLabel` (optional): a string **OR** a React-Native component for the Next label. Defaults to `Next`.
* `showNext` (optional): a bool flag indicating whether the Next button is visible. Defaults to `true`.
* `skipLabel` (optional): a string **OR** a React-Native component for the Skip label. Defaults to `Skip`.
* `showSkip` (optional): a bool flag indicating whether the Skip button is visible. Defaults to `true`.
* `onSkip` (optional): a callback that is fired if the Onboarding is skipped.
* `skipToPage` (optional): when pressing skip, go to that page (e.g. `skipToPage={2}`). If this prop is provided, ignores `onSkip`.
* `onDone` (optional): a callback that is fired after the Onboarding is completed.
* `showDone` (optional): a bool flag indicating whether the Done checkmark button is visible. Defaults to `true`.

### General

* `bottomBarHeight` (optional): a number for the height of the bottom bar. Defaults to `60`.
* `bottomBarColor` (optional): backgroundColor of the bottom bar. Defaults to `transparent`.
* `bottomBarHighlight` (optional): a bool flag indicating whether the bottom bar should be highlighted. Defaults to `true`.
* `controlStatusBar` (optional): a bool flag indicating whether the status bar should change with the background color. Defaults to `true`.
* `showPagination` (optional): whether to show the bottom pagination bar. Defaults to `true`.
* `flatlistProps` (optional): additional props for the [FlatList](https://facebook.github.io/react-native/docs/flatlist.html) which holds all the pages.
* `transitionAnimationDuration` (optional): The duration in milliseconds for the animation of the background color for the page transition. Defaults to `500`.
* `allowFontScalingText` (optional): Font scaling can cause troubles with high-resolution screens. You may want to disable it. Defaults to `true`.
* `allowFontScalingButtons` (optional): Font scaling can cause troubles with high-resolution screens. You may want to disable it. Defaults to `true`.
* `pageIndexCallback` (optional): a function that receives the page `index` as a parameter on page change. [Example Usage](https://github.com/jfilter/react-native-onboarding-swiper/pull/40)

### Default Page Styles

For the pages in the `pages` array, you can set the default styles (and override the styles set by this component).

* `containerStyles` (optional): override the default container styles.
* `imageContainerStyles` (optional): override the default image container styles e.g. the `paddingBottom` of 60.
* `titleStyles` (optional): override the default title styles.
* `subTitleStyles` (optional): override the default subtitle styles.

### Adjust Individual Page Styles

For each page in the `pages` array, you can override the default page styles. [An example](examples/CustomButtons.js).

* `titleStyles` (optional): modify styles of a specific page's title.
* `subTitleStyles` (optional): modify styles of a specific page's subtitle.

## Custom Components Properties

You can also provide your own custom components for the buttons and the dots. All of them have access to a `isLight` prop but it's up to you what you do with it. Also checkout [this example](examples/CustomButtons.js).

* `SkipButtonComponent` (optional): Skip Button, gets `skipLabel` as prop.
* `NextButtonComponent` (optional): Next Button, gets `nextLabel` as prop.
* `DoneButtonComponent` (optional): Done Button.
* `DotComponent` (optional): Dot for the pagination, gets `selected` as prop to indicate the active page.

## Controlling the pages imperatively 

You can control the Onboarding component imperatively with [useRef](https://reactjs.org/docs/hooks-reference.html#useref).

```js
const onboardingRef = useRef<Onboarding>(null);

<Onboarding
    ref={onboardingRef}
    pages={pages}
/>

onboardingRef.current.goNext()
onboardingRef.current.goToPage(2, true)
onboardingRef.current.goToPage(2, false)
```

Methods:

* `goNext()` : Go to the next page.
* `goToPage(pageIndex, animated)` : Go to the selected page.

## Contributing

If you have a **question**, found a **bug** or want to propose a new **feature**, have a look at the [issues page](https://github.com/jfilter/react-native-onboarding-swiper/issues).

**Pull requests** are especially welcomed when they fix bugs or improve the code quality.

## Related

* https://github.com/jacse/react-native-app-intro-slider

## Acknowledgements

Built upon the work by [Gosha Arinich](https://github.com/goshakkk/react-native-simple-onboarding) which was originally inspired by [AndroidOnboarder](https://github.com/chyrta/AndroidOnboarder).

## License

MIT.

import { Component, ReactElement, ComponentType } from 'react';
import { FlatListProps, StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface PageData {
  backgroundColor: string;
  image: ReactElement;
  title: string | ReactElement | (() => ReactElement);
  subtitle: string | ReactElement;
  titleStyles?: StyleProp<TextStyle>;
  subTitleStyles?: StyleProp<TextStyle>;
}

export interface DotProps {
  selected: boolean;
  isLight: boolean;
}

export interface SkipButtonProps {
  skipLabel: string | ReactElement;
  isLight: boolean;
  allowFontScaling: boolean;
  onPress: () => void;
}

export interface NextButtonProps {
  nextLabel: string | ReactElement;
  isLight: boolean;
  allowFontScaling: boolean;
  onPress: () => void;
}

export interface DoneButtonProps {
  isLight: boolean;
  allowFontScaling: boolean;
  onPress: () => void;
}

export interface OnboardingProps {
  pages: PageData[];
  bottomBarHighlight?: boolean;
  bottomBarHeight?: number;
  bottomBarColor?: string;
  controlStatusBar?: boolean;
  showSkip?: boolean;
  showNext?: boolean;
  showDone?: boolean;
  showPagination?: boolean;
  onSkip?: () => void;
  onDone?: () => void;
  skipLabel?: string | ReactElement;
  nextLabel?: string | ReactElement;
  SkipButtonComponent?: ComponentType<SkipButtonProps>;
  DoneButtonComponent?: ComponentType<DoneButtonProps>;
  NextButtonComponent?: ComponentType<NextButtonProps>;
  DotComponent?: ComponentType<DotProps>;
  containerStyles?: StyleProp<ViewStyle>;
  imageContainerStyles?: StyleProp<ViewStyle>;
  allowFontScalingText?: boolean;
  allowFontScalingButtons?: boolean;
  titleStyles?: StyleProp<TextStyle>;
  subTitleStyles?: StyleProp<TextStyle>;
  transitionAnimationDuration?: number;
  skipToPage?: number;
  pageIndexCallback?: (index: number) => void;
  flatlistProps?: Partial<FlatListProps<PageData>>;
}

export default class Onboarding extends Component<OnboardingProps> {
  goNext(): void;
  goToPage(index: number, animated?: boolean): void;
}

import React from 'react';
import {ViewStyle, TextStyle, ImageStyle, Dimensions} from 'react-native';
import {
  createText,
  createBox,
  useTheme as useReTheme,
  ThemeProvider as ReStyleThemeProvider,
} from '@shopify/restyle';

import {getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';

export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
  SYSTEM: 'system',
};

const {width, height, scale} = Dimensions.get('window');
const vw = width / 100;
const vh = height / 100;
const vmin = Math.min(vw, vh);
const vmax = Math.max(vw, vh);

const statusBarHeight = getStatusBarHeight();
const bottomSpace = getBottomSpace();

export const aspectRatio = width / 375;

export const palette = {
  primaryColor: '#AC926F',
  primaryButton: '#F2E0D0',

  blue: '#08427C',
  darkBlue: '#0C0D34',
  white: 'white',
  background: '#FFF',
  screenBackground: '#FFF',
  orange: '#FE5E33',
  yellow: '#FFC641',
  pink: '#FF87A2',
  violet: '#442CB9',
  lightBlue: '#BFEAF5',
  grey: '#686868',
  lightGrey: '#979797',
  lighterGrey: '#CDD4DA',
  darkGrey: '#333',
  title: '#080818',
  shadow: '#333',
};

export const theme = {
  colors: {
    primary: palette.primaryColor,
    primaryLight: '#E7F9F7',
    secondary: palette.darkBlue,
    primaryButton: palette.primaryButton,
    danger: '#FF0058',
    info: '#808080',
    titleText: palette.title,
    listTitle: palette.title,
    text: 'rgba(88, 88, 88, 1)',
    subText: palette.grey,
    textContrast: palette.white,
    inactiveText: palette.lightGrey,
    highlightedText: palette.blue,
    background: palette.background,
    forground: palette.white,
    screenBackground: palette.screenBackground,
    grey: palette.grey,
    borderLight: palette.lighterGrey,
    iconDefault: palette.lightGrey,
    activeIcon: palette.primaryColor,
    inactiveIcon: palette.lightGrey,
    shadow: palette.shadow,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  buttonWidth: {
    s: 60,
    m: 118,
    l: 165,
    xl: 225,
  },
  pageVariants: {
    defaults: {
      width: '100%',
    },
  },
  cardVariants: {
    defaults: {
      // We can define defaults for the variant here.
      // This will be applied after the defaults passed to createVariant and before the variant defined below.
    },
    regular: {
      // We can refer to other values in the theme here, and use responsive props
      padding: {
        phone: 's',
        tablet: 'm',
      },
    },
    elevated: {
      padding: {
        phone: 's',
        tablet: 'm',
      },
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {width: 0, height: 5},
      shadowRadius: 15,
      elevation: 5,
    },
  },
  textVariants: {
    hero: {
      fontSize: 80,
      lineHeight: 80,
      fontFamily: 'Montserrat-Bold',
      color: 'background',
      textAlign: 'center',
    },
    super: {
      fontSize: 44,
      fontFamily: 'Montserrat-Black',
      color: 'secondary',
    },
    title1: {
      fontSize: 36,
      fontFamily: 'Montserrat-Bold',
      color: 'secondary',
    },
    title2: {
      fontSize: 30,
      lineHeight: 38,
      fontFamily: 'Montserrat-Bold',
      color: 'titleText',
    },
    title3: {
      fontSize: 24,
      fontFamily: 'Montserrat-Bold',
      color: 'secondary',
    },
    title4: {
      fontSize: 20,
      fontFamily: 'Montserrat-Medium',
      color: 'secondary',
    },
    title5: {
      fontSize: 16,
      fontFamily: 'Montserrat-Medium',
      color: 'secondary',
    },
    title6: {
      fontSize: 12,
      fontFamily: 'Montserrat-Medium',
      color: 'secondary',
    },

    listTitle: {
      fontSize: 14,
      fontFamily: 'Montserrat-Medium',
      color: 'listTitle',
      letterSpacing: 0.45,
      lineHeight: 16,
    },
    listSubtitle: {
      fontSize: 12,
      fontFamily: 'SFPro-Medium',
      lineHeight: 16,
    },
    body: {
      fontSize: 14,
      lineHeight: 18,
      fontFamily: 'Montserrat-Regular',
      color: 'text',
    },
    button: {
      fontSize: 15,
      fontFamily: 'Montserrat-Medium',
      color: 'text',
      textAlign: 'center',
    },
    header: {
      fontSize: 12,
      lineHeight: 24,
      fontFamily: 'Montserrat-Semibold',
      color: 'secondary',
    },
    cardTitle: {
      fontSize: 18,
      lineHeight: 20,
      fontFamily: 'Montserrat-Semibold',
    },
    nav: {
      fontSize: 12,
      lineHeight: 16,
      fontFamily: 'Montserrat-Semibold',
      color: 'secondary',
    },
    customTab: {
      fontSize: 14,
      lineHeight: 18,
      fontFamily: 'SFPro-Regular',
    },
    mapMarkerText: {
      fontSize: 10,
      lineHeight: 12,
      fontFamily: 'SFPro-Regular',
    },
    borderLessButtonText: {
      fontSize: 14,
      lineHeight: 18,
      fontFamily: 'SFPro-Regular',
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  iconSize: {
    xsSmall: 12,
    small: 14,
    medium: 18,
    large: 24,
    extraLarge: 28,
  },
  size: {
    height,
    width,
    scale,
    vw,
    vh,
    vmin,
    vmax,
    statusBarHeight,
    bottomSpace,
  },
};

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.darkGrey,
    forground: palette.lightGrey,
  },
};

// export const ThemeProvider = ({ children }: { children: ReactNode }, props: any) => {
//   console.tron.log("PROPS ON THE THEME", props)
//   return (
//     <ReStyleThemeProvider theme={props.isDarkMode ? darkTheme : theme}>
//       {children}
//     </ReStyleThemeProvider>
//   )
// }

export type Theme = typeof theme;
export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export const useTheme = () => useReTheme<Theme>();
type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

export const makeStyles = <T extends NamedStyles<T>>(
  styles: (theme: Theme) => T,
) => () => {
  const currentTheme = useTheme();
  return styles(currentTheme);
};

export const useSize = () => {
  const currentTheme = useTheme();
  return currentTheme.size;
};

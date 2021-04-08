import { colorsMap } from './colorsMap';
import _ from 'lodash';
import shadowStyles from './shadow-styles.js';
import { Platform, StatusBar } from 'react-native';
import { Dimensions } from 'react-native';
import Fonts from './fontMap';
import { getIsAndroid } from 'config/device';

const isAndroid = getIsAndroid();
const statusBarHeight = isAndroid ? StatusBar.currentHeight : 0;

export function mapToStyles(dictionary, cssProp, prefix = '', extraProps) {
  const newStyles = {};
  _.forEach(dictionary, (v, k) => {
    let newProp = {
      [cssProp]: v,
    };
    if (extraProps) {
      newProp = Object.assign({}, newProp, extraProps);
    }
    newStyles[prefix + k] = newProp;
  });
  return newStyles;
}

const colorStyles = mapToStyles(colorsMap, 'color');

//This needs to be fixed
// const {width, height, scale} = Dimensions.get('window'),
//   vw = width / 100,
//   vh = height / 100;

// _.times(101, (n) => (heightStyles[`vh-${n}`] = {height: vh * n}));
// _.times(101, (n) => (widthStyles[`vw-${n}`] = {height: vw * n}));

const bgColorStyles = mapToStyles(colorsMap, 'backgroundColor', 'bg-');
const hoverColorStyles = mapToStyles(colorsMap, 'backgroundColor', 'hover-');
const shadowColorStyles = mapToStyles(colorsMap, 'shadowColor', 'sh-');

const fontMap = Platform.OS === 'ios' ? Fonts.ios : Fonts.android;
const fonts = {
  'proxima-nova': fontMap.ProximaNovaRegular,
  pn: fontMap.ProximaNovaRegular,
  helvetica: fontMap.ProximaNovaRegular,
  hel: fontMap.ProximaNovaRegular,
};

const fontStyles = mapToStyles(fonts, 'fontFamily');

const fontWeightStyles = {
  thin: { fontFamily: fontMap.ProximaNovaThin },
  light: { fontFamily: fontMap.ProximaNovaLight },
  't-normal': { fontFamily: fontMap.ProximaNovaRegular },
  semi: { fontFamily: fontMap.ProximaNovaSemibold },
  semibold: { fontFamily: fontMap.ProximaNovaSemibold },
  bold: {
    fontFamily: fontMap.ProximaNovaBold,
  },

  /**
   * used on stylesheet:
   *  ProximaNova   - light, regular, bold
   *  ProximaNova - regular, semibold, bold
   */

  // regular exists as 'pn' and 'hel' already
  'pn-semi': { fontFamily: fontMap.ProximaNovaSemibold },
  'pn-bold': { fontFamily: fontMap.ProximaNovaBold },
  'hel-light': { fontFamily: fontMap.ProximaNovaLight },
  'hel-bold': { fontFamily: fontMap.ProximaNovaBold },
};

const fontSizeStyles = {
  h0: { fontSize: 34, fontFamily: fontMap.ProximaNovaBold },
  h1: { fontSize: 32, fontFamily: fontMap.ProximaNovaBold },
  h2: { fontSize: 28, fontFamily: fontMap.ProximaNovaBold },
  h3: { fontSize: 24, fontFamily: fontMap.ProximaNovaBold },
  h4: { fontSize: 22, fontFamily: fontMap.ProximaNovaBold },
  'h4.1': { fontSize: 21, fontFamily: fontMap.ProximaNovaBold },
  h4x: { fontSize: 20, fontFamily: fontMap.ProximaNovaBold },
  h5: { fontSize: 18, fontFamily: fontMap.ProximaNovaBold },
  h6: { fontSize: 16, fontFamily: fontMap.ProximaNovaBold },
  h7: { fontSize: 14, fontFamily: fontMap.ProximaNovaBold },
  h8: { fontSize: 12, fontFamily: fontMap.ProximaNovaBold },
  h9: { fontSize: 10, fontFamily: fontMap.ProximaNovaBold },
  'h9.5': { fontSize: 9, fontFamily: fontMap.ProximaNovaBold },
  h10: { fontSize: 8, fontFamily: fontMap.ProximaNovaBold },
  't-xl': { fontSize: 36 },
  't-lxxx': { fontSize: 28 },
  't-lxx': { fontSize: 22 },
  't-20': { fontSize: 20 },
  't-lx': { fontSize: 18 },
  't-l': { fontSize: 16 },
  t: { fontSize: 16 },
  't-m': { fontSize: 14 },
  't-s': { fontSize: 12 },
  't-sx': { fontSize: 10 },
  't-sxx': { fontSize: 8 },
  't-sxxx': { fontSize: 6 },
  't-align-center': { textAlign: 'center' },
  't-align-right': { textAlign: 'right' },
  't-nowrap': { whiteSpace: 'nowrap' },
  'lh-10': { lineHeight: 10 },
  'lh-12': { lineHeight: 12 },
  'lh-14': { lineHeight: 14 },
  'lh-16': { lineHeight: 16 },
  'lh-18': { lineHeight: 18 },
  'lh-20': { lineHeight: 20 },
  'lh-22': { lineHeight: 22 },
  'lh-24': { lineHeight: 24 },
  'lh-26': { lineHeight: 26 },

  'text-3xs': { fontSize: 8, lineHeight: 8 },
  'text-2xs': { fontSize: 10, lineHeight: 10 },
  'text-xs': { fontSize: 12, lineHeight: 12 },
  'text-sm': { fontSize: 14, lineHeight: 14 },
  text: { fontSize: 16, lineHeight: 16 },
  'text-lg': { fontSize: 20, lineHeight: 20 },
  'text-xl': { fontSize: 24, lineHeight: 24 },
  'text-2xl': { fontSize: 28, lineHeight: 28 },
  'text-3xl': { fontSize: 32, lineHeight: 32 },
  'text-4xl': { fontSize: 36, lineHeight: 36 },
  'text-5xl': { fontSize: 40, lineHeight: 40 },
  'text-6xl': { fontSize: 44, lineHeight: 44 },
  'text-7xl': { fontSize: 48, lineHeight: 48 },

  'header-4xs': {
    fontSize: 8,
    lineHeight: 8,
    fontFamily: fontMap.ProximaNovaBold,
  },
  'header-3xs': {
    fontSize: 10,
    lineHeight: 10,
    fontFamily: fontMap.ProximaNovaBold,
  },
  'header-2xs': {
    fontSize: 12,
    lineHeight: 12,
    fontFamily: fontMap.ProximaNovaBold,
  },
  'header-xs': {
    fontSize: 14,
    lineHeight: 14,
    fontFamily: fontMap.ProximaNovaBold,
  },
  'header-sm': {
    fontSize: 16,
    lineHeight: 16,
    fontFamily: fontMap.ProximaNovaBold,
  },
  header: {
    fontSize: 18,
    lineHeight: 18,
    fontFamily: fontMap.ProximaNovaBold,
  },
  'header-lg': {
    fontSize: 24,
    lineHeight: 24,
    fontFamily: fontMap.ProximaNovaBold,
  },
  'header-xl': {
    fontSize: 28,
    lineHeight: 28,
    fontFamily: fontMap.ProximaNovaBold,
  },
  'header-2xl': {
    fontSize: 32,
    lineHeight: 32,
    fontFamily: fontMap.ProximaNovaBold,
  },
  'header-3xl': {
    fontSize: 36,
    lineHeight: 36,
    fontFamily: fontMap.ProximaNovaBold,
  },
  'header-4xl': {
    fontSize: 40,
    lineHeight: 40,
    fontFamily: fontMap.ProximaNovaBold,
  },
  'header-5xl': {
    fontSize: 44,
    lineHeight: 44,
    fontFamily: fontMap.ProximaNovaBold,
  },
  'header-6xl': {
    fontSize: 48,
    lineHeight: 48,
    fontFamily: fontMap.ProximaNovaBold,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: fontMap.ProximaNovaRegular,
  },
  'paragraph-sm': {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: fontMap.ProximaNovaRegular,
  },
};

const borderWidths = {
  0: 0,
  1: 1,
  1.5: 1.5,
  2: 2,
  3: 3,
  4: 4,
  6: 6,
  8: 8,
};

const borderStyles = mapToStyles(borderWidths, 'borderWidth', 'b-', {
  borderStyle: 'solid',
});
const borderWidthStyles = mapToStyles(borderWidths, 'borderWidth', 'bw-');
const borderColorStyles = mapToStyles(colorsMap, 'borderColor', 'b-');
const borderTopStyles = mapToStyles(borderWidths, 'borderTopWidth', 'bt-', {
  borderStyle: 'solid',
});
const borderLeftStyles = mapToStyles(borderWidths, 'borderLeftWidth', 'bl-', {
  borderStyle: 'solid',
});
const borderRightStyles = mapToStyles(borderWidths, 'borderRightWidth', 'br-', {
  borderStyle: 'solid',
});
const borderBottomStyles = mapToStyles(
  borderWidths,
  'borderBottomWidth',
  'bb-',
  { borderStyle: 'solid' }
);

const borderBottomColorStyles = mapToStyles(
  colorsMap,
  'borderBottomColor',
  'bbc-'
);

const borderRadius = {
  none: 0,
  s: 2,
  m: 4,
  m2: 6,
  m3: 8,
  mx: 10,
  12: 12,
  15: 15,
  mxx: 16,
  20: 20,
  24: 24,
  30: 30,
  32: 32,
  33: 33,
  35: 35,
  39: 39,
  44: 44,
  48: 48,
  53: 53,
  60: 60,
  mxxx: 40,
  full: 299,
};

const borderRadiusStyles = mapToStyles(borderRadius, 'borderRadius', 'brad-');
borderRadiusStyles['brad-right-mx'] = {
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
};
borderRadiusStyles['brad-left-mx'] = {
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
};
borderRadiusStyles['brad-bottom-mx'] = {
  borderBottomRightRadius: 10,
  borderBottomLeftRadius: 10,
};
borderRadiusStyles['brad-top-mx'] = {
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10,
};

borderRadiusStyles['brad-right-m'] = {
  borderTopRightRadius: 4,
  borderBottomRightRadius: 4,
};
borderRadiusStyles['brad-left-m'] = {
  borderTopLeftRadius: 4,
  borderBottomLeftRadius: 4,
};
borderRadiusStyles['brad-left-0'] = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
};
borderRadiusStyles['brad-right-0'] = {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
};

const display = {
  block: 'block',
  inline: 'inline',
  'inline-block': 'inline-block',
  none: 'none',
};

const displayStyles = mapToStyles(display, 'display');

const cursor = {
  pointer: 'pointer',
};

const cursorStyles = mapToStyles(cursor, 'cursor');

const position = {
  relative: 'relative',
  absolute: 'absolute',
  fixed: 'fixed',
};

const positionStyles = mapToStyles(position, 'position');

const positionSpacingStyles = {};

_.times(500, (n) => (positionSpacingStyles[`bottom-${n}`] = { bottom: n }));
_.times(500, (n) => (positionSpacingStyles[`bottom--${n}`] = { bottom: -n }));
_.times(500, (n) => (positionSpacingStyles[`top-${n}`] = { top: n }));
_.times(500, (n) => (positionSpacingStyles[`top--${n}`] = { top: -n }));
_.times(500, (n) => (positionSpacingStyles[`left-${n}`] = { left: n }));
_.times(500, (n) => (positionSpacingStyles[`right-${n}`] = { right: n }));
_.times(500, (n) => (positionSpacingStyles[`left--${n}`] = { left: -n }));
_.times(500, (n) => (positionSpacingStyles[`right--${n}`] = { right: -n }));
positionSpacingStyles['absolute-0'] = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  position: 'absolute',
};

const heightStyles = { 'h-null': { height: null } };

_.times(1024, (n) => (heightStyles[`h-${n}`] = { height: n }));
_.times(1024, (n) => (heightStyles[`h-min-${n}`] = { minHeight: n }));
_.times(100, (n) => (heightStyles[`h-${n}p`] = { height: `${n}%` }));

const widthStyles = { 'w-null': { width: null } };

_.times(4096, (n) => (widthStyles[`w-${n}`] = { width: n }));
_.times(1024, (n) => (widthStyles[`w-min-${n}`] = { minWidth: n }));
_.times(1024, (n) => (widthStyles[`w-max-${n}`] = { maxWidth: n }));
_.times(100, (n) => (widthStyles[`w-${n}p`] = { width: `${n}%` }));

_.times(100, (n) => (widthStyles[`o-${n}`] = { opacity: n / 100 }));

const zIndexStyles = {};

_.times(100, (n) => (zIndexStyles[`z-${n}`] = { zIndex: n }));

const padding = {
  px: 1,
  none: 0,
  sxxx: 2,
  sxx: 4,
  sx: 6,
  s: 8,
  m: 12,
  mx: 14,
  mxx: 16,
  mxxx: 20,
  l: 24,
  lx: 28,
  lxx: 36,
  lxxx: 48,
  xl: 64,
};

const paddingStyles = Object.assign({}, mapToStyles(padding, 'padding', 'p-'), {
  'pt-android': {
    ...Platform.select({
      android: { marginTop: statusBarHeight },
    }),
  },
});

const paddingTopStyles = mapToStyles(padding, 'paddingTop', 'pt-');
const paddingBottomStyles = mapToStyles(padding, 'paddingBottom', 'pb-');
const paddingLeftStyles = mapToStyles(padding, 'paddingLeft', 'pl-');
const paddingRightStyles = mapToStyles(padding, 'paddingRight', 'pr-');
const paddingHorizontalStyles = {};
_.forEach(
  padding,
  (psize, k) =>
    (paddingHorizontalStyles[`px-${k}`] = {
      paddingLeft: psize,
      paddingRight: psize,
    })
);
const paddingVerticalStyles = {};
_.forEach(
  padding,
  (psize, k) =>
    (paddingVerticalStyles[`py-${k}`] = {
      paddingTop: psize,
      paddingBottom: psize,
    })
);

_.times(300, (n) => {
  paddingStyles[`p-${n}`] = { padding: n };
  paddingTopStyles[`pt-${n}`] = { paddingTop: n };
  paddingBottomStyles[`pb-${n}`] = { paddingBottom: n };
  paddingLeftStyles[`pl-${n}`] = { paddingLeft: n };
  paddingRightStyles[`pr-${n}`] = { paddingRight: n };
  paddingHorizontalStyles[`px-${n}`] = { paddingLeft: n, paddingRight: n };
  paddingVerticalStyles[`py-${n}`] = { paddingTop: n, paddingBottom: n };
});

export const margins = {
  px: 1,
  none: 0,
  sxxx: 2,
  sxx: 4,
  sx: 6,
  s: 8,
  m: 12,
  mx: 14,
  mxx: 16,
  mxxx: 20,
  l: 24,
  lx: 28,
  lxx: 36,
  lxxx: 48,
  xl: 64,
  xlx: 96,
  xlxx: 128,
  xlxxx: 164,
};

const marginStyles = mapToStyles(margins, 'margins', 'm-');
const marginTopStyles = mapToStyles(margins, 'marginTop', 'mt-');
const marginBottomStyles = mapToStyles(margins, 'marginBottom', 'mb-');
const marginLeftStyles = mapToStyles(margins, 'marginLeft', 'ml-');
const marginRightStyles = mapToStyles(margins, 'marginRight', 'mr-');

const marginHorizontalStyles = {};
_.forEach(
  margins,
  (psize, k) =>
    (marginHorizontalStyles[`mx-${k}`] = {
      marginLeft: psize,
      marginRight: psize,
    })
);
_.forEach(
  margins,
  (psize, k) =>
    (marginHorizontalStyles[`mx--${k}`] = {
      marginLeft: -psize,
      marginRight: -psize,
    })
);
const marginVerticalStyles = {};
_.forEach(
  margins,
  (psize, k) =>
    (marginVerticalStyles[`my-${k}`] = {
      marginTop: psize,
      marginBottom: psize,
    })
);

const direction = {
  rows: 'column',
  'rows-reverse': 'column-reverse',
  columns: 'row',
  'columns-reverse': 'row-reverse',
};

const directionStyles = mapToStyles(direction, 'flexDirection', 'f-');

const wrap = {
  nowrap: 'nowrap',
  wrap: 'wrap',
  'wrap-reverse': 'wrap-reverse',
};
const wrapStyles = mapToStyles(wrap, 'flexWrap', 'f-');

const justify = {
  start: 'flex-start',
  'flex-start': 'flex-start',
  end: 'flex-end',
  'flex-end': 'flex-end',
  center: 'center',
  'space-around': 'space-around',
  'space-between': 'space-between',
};

const justifyStyles = mapToStyles(justify, 'justifyContent', 'f-');
const justifyItemsStyles = mapToStyles(justify, 'justifyItems', 'f-ji-');

const align = {
  'align-stretch': 'stretch',
  'align-baseline': 'baseline',
  'align-center': 'center',
  'align-start': 'flex-start',
  'align-end': 'flex-end',
};

const alignItemsStyles = mapToStyles(align, 'alignItems', 'f-');

const comboAlignmentStyles = {
  'f-center-center': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  'f-center-start': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  'f-center-end': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  'f-center-baseline': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  'f-center-stretch': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  'f-start-center': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  'f-start-start': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  'f-start-end': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  'f-start-baseline': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  'f-start-stretch': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  'f-end-center': {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  'f-end-start': {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  'f-end-end': {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  'f-end-baseline': {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'baseline',
  },
  'f-end-stretch': {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  'f-around-center': {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  'f-around-start': {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  'f-start-around': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'space-around',
  },
  'f-around-end': {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  'f-around-baseline': {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'baseline',
  },
  'f-around-stretch': {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  'f-between-center': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  'f-between-start': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  'f-between-end': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  'f-between-baseline': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  'f-between-stretch': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
};

comboAlignmentStyles['f-cc'] = comboAlignmentStyles['f-center-center'];
comboAlignmentStyles['f-cs'] = comboAlignmentStyles['f-center-start'];
comboAlignmentStyles['f-ce'] = comboAlignmentStyles['f-center-end'];
comboAlignmentStyles['f-cb'] = comboAlignmentStyles['f-center-baseline'];
comboAlignmentStyles['f-cstretch'] = comboAlignmentStyles['f-center-stretch'];
comboAlignmentStyles['f-sc'] = comboAlignmentStyles['f-start-center'];
comboAlignmentStyles['f-ss'] = comboAlignmentStyles['f-start-start'];
comboAlignmentStyles['f-se'] = comboAlignmentStyles['f-start-end'];
comboAlignmentStyles['f-sb'] = comboAlignmentStyles['f-start-baseline'];
comboAlignmentStyles['f-sstretch'] = comboAlignmentStyles['f-start-stretch'];
comboAlignmentStyles['f-ec'] = comboAlignmentStyles['f-end-center'];
comboAlignmentStyles['f-es'] = comboAlignmentStyles['f-end-start'];
comboAlignmentStyles['f-ee'] = comboAlignmentStyles['f-end-end'];
comboAlignmentStyles['f-eb'] = comboAlignmentStyles['f-end-baseline'];
comboAlignmentStyles['f-estretch'] = comboAlignmentStyles['f-end-stretch'];
comboAlignmentStyles['f-ac'] = comboAlignmentStyles['f-around-center'];
comboAlignmentStyles['f-as'] = comboAlignmentStyles['f-around-start'];
comboAlignmentStyles['f-sa'] = comboAlignmentStyles['f-start-around'];
comboAlignmentStyles['f-ae'] = comboAlignmentStyles['f-around-end'];
comboAlignmentStyles['f-ab'] = comboAlignmentStyles['f-around-baseline'];
comboAlignmentStyles['f-astretch'] = comboAlignmentStyles['f-around-stretch'];
comboAlignmentStyles['f-bc'] = comboAlignmentStyles['f-between-center'];
comboAlignmentStyles['f-bs'] = comboAlignmentStyles['f-between-start'];
comboAlignmentStyles['f-be'] = comboAlignmentStyles['f-between-end'];
comboAlignmentStyles['f-bb'] = comboAlignmentStyles['f-between-baseline'];
comboAlignmentStyles['f-bstretch'] = comboAlignmentStyles['f-between-stretch'];

const alignContent = {
  'content-stretch': 'stretch',
  'content-center': 'center',
  'content-flex-start': 'flex-start',
  'content-flex-end': 'flex-end',
  'content-space-around': 'space-around',
  'content-space-between': 'space-between',
};

const alignContentStyles = mapToStyles(alignContent, 'alignContent', 'f-');

const alignSelf = {
  'self-auto': 'auto',
  'self-flex-start': 'flex-start',
  'self-start': 'flex-start',
  'self-flex-end': 'flex-end',
  'self-end': 'flex-end',
  'self-center': 'center',
  'self-stretch': 'stretch',
  'self-baseline': 'baseline',
};

const alignSelfStyles = mapToStyles(alignSelf, 'alignSelf', 'f-');

const flexStyles = {};
_.times(100, (n) => (flexStyles[`f-${n}`] = { flex: n }));
_.times(100, (n) => (flexStyles[`f-grow-${n}`] = { flexGrow: n }));
_.times(100, (n) => (flexStyles[`f-s-${n}`] = { flexShrink: n }));
flexStyles['f-scroll'] = { flexGrow: 1 };

const gridAutoFlow = {
  column: 'column',
  row: 'row',
  'row-dense': 'row dense',
  'column-dense': 'column dense',
  dense: 'dense',
};
const gridAutoFlowStyles = mapToStyles(gridAutoFlow, 'grid-auto-flow', 'g-af');
const gridGapStyles = mapToStyles(margins, 'grid-gap', 'g-g-');

const gridTemplateColumnStyles = {
  /*custom templates go here*/
  g: { display: 'grid' },
  'g-tc-7-grow-4': {
    gridTemplateColumns: 'auto auto auto 1fr auto auto auto',
  },
  'g-tc-1a1': {
    gridTemplateColumns: '1fr auto 1fr',
  },
};
_.times(
  20,
  (n) =>
    (gridTemplateColumnStyles[`g-tc-${n * 25}`] = {
      'grid-template-columns':
        'repeat(auto-fit, minmax(' + (n * 25).toString() + ', 1fr))',
    })
);
_.times(
  12,
  (n) =>
    (gridTemplateColumnStyles[`g-tc-fr-${n}`] = {
      'grid-template-columns': `${n}fr`,
    })
);

_.times(
  12,
  (n) =>
    (gridTemplateColumnStyles[`g-tc-a-${n}`] = {
      'grid-template-columns': `repeat(${n}, auto)`,
    })
);

const buttonStyles = {
  btn: {
    borderRadius: borderRadius.mx,
    padding: padding.m,
  },
  'btn-text': {
    color: colorsMap.white,
    fontFamily: fontMap.ProximaNovaBold,
  },
  'btn-secondary': {
    backgroundColor: colorsMap.primary,
  },
  'btn-primary': {
    backgroundColor: colorsMap['primary'],
  },
  'btn-tertiary': {
    backgroundColor: colorsMap.white,
    borderWidth: 1,
    borderColor: colorsMap['primary'],
  },
  'btn-muted': {
    backgroundColor: colorsMap.white,
    borderWidth: 0,
    borderColor: colorsMap['primary'],
  },
  'btn-search-icon': {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 0,
  },
  'btn-side-rounded': Object.assign(
    {
      borderTopRightRadius: 0,
      borderTopLeftRadius: 50,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 50,
      justifyContent: 'flex-start',
      padding: padding.m,
      paddingLeft: padding.mxx,
      flexDirection: 'row',
      alignItems: 'center',
    },
    shadowStyles['sh-light']
  ),
  'btn-side-square': Object.assign(
    {
      justifyContent: 'flex-start',
      padding: padding.m,
      paddingLeft: padding.mxx,
      flexDirection: 'row',
      alignItems: 'center',
    },
    shadowStyles['sh-default']
  ),
};

const formStyles = {
  'form-label': {
    color: colorsMap['gray-dark-medium'],
    fontSize: fontSizeStyles.t.fontSize,
    fontWeight: 'bold',
    fontFamily: fontMap.ProximaNovaRegular,
  },
  input: {
    border: '1px solid ' + colorsMap['cool-gray-light'],
    borderRadius: borderRadius.m,
    color: 'blue',
  },
  textArea: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorsMap['cool-gray-light'],
    borderRadius: borderRadius.m,
    padding: padding.m,
  },
};

const androidTextArea = Platform.select({
  android: { textAlignVertical: 'top' },
});
formStyles.textArea = Object.assign({}, formStyles.textArea, androidTextArea);

const overFlowStyles = {
  'o-hidden': { overflow: 'hidden' },
  'o-visible': { overflow: 'visible' },
};

const transformStyles = {
  'rotate-45': { transform: [{ rotate: '45deg' }] },
  'rotate-90': { transform: [{ rotate: '90deg' }] },
  'rotate-180': { transform: [{ rotate: '180deg' }] },
  'rotate-270': { transform: [{ rotate: '270deg' }] },
};

export const styleMap = Object.assign(
  {},
  colorStyles,
  transformStyles,
  bgColorStyles,
  hoverColorStyles,
  borderStyles,
  borderBottomStyles,
  borderTopStyles,
  borderLeftStyles,
  borderRadiusStyles,
  borderRightStyles,
  borderColorStyles,
  borderWidthStyles,
  borderBottomColorStyles,
  shadowStyles,
  fontStyles,
  fontWeightStyles,
  fontSizeStyles,
  paddingTopStyles,
  paddingLeftStyles,
  paddingRightStyles,
  paddingBottomStyles,
  paddingStyles,
  paddingHorizontalStyles,
  paddingVerticalStyles,
  marginStyles,
  marginLeftStyles,
  marginRightStyles,
  marginTopStyles,
  marginBottomStyles,
  marginHorizontalStyles,
  marginVerticalStyles,
  displayStyles,
  cursorStyles,
  overFlowStyles,
  positionStyles,
  wrapStyles,
  justifyStyles,
  justifyItemsStyles,
  directionStyles,
  alignSelfStyles,
  alignItemsStyles,
  alignContentStyles,
  comboAlignmentStyles,
  flexStyles,
  buttonStyles,
  widthStyles,
  heightStyles,
  positionSpacingStyles,
  gridAutoFlowStyles,
  gridTemplateColumnStyles,
  gridGapStyles,
  formStyles,
  shadowColorStyles
);

function buildStyleHelpers(arr) {
  arr.and = function (otherArr) {
    return buildStyleHelpers([...this, ...otherArr]);
  };
  arr.if = function (condition, styleStr) {
    const res = condition && condition();

    if (res) {
      const newStyles = [...this, ...buildStyles(styleStr, styleMap)];
      console.log('newStyles', newStyles);
      return buildStyleHelpers(newStyles);
    }
    return this;
  };
  return arr;
}

export function buildStyles(namesStr, styleMap) {
  if (!namesStr || !styleMap) {
    return [];
  }

  //'hel-bold red p-mxx'
  const namesArr = namesStr.trim().split(' ');
  const styles = namesArr.map((name) => (name && styleMap[name]) || {});
  return buildStyleHelpers(styles);
}

// module.exports = styleMap;
export default styleMap;

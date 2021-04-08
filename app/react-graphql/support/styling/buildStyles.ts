import {styleMap as defaultStyles} from './defaultStyles';

let styleMap: any = {
  ...defaultStyles,
};

export function registerStyles(newStyles: any) {
  styleMap = {
    ...styleMap,
    ...newStyles,
  };
}

export function buildStyles(namesStr: string) {
  if (!namesStr || !styleMap) {
    return [];
  }

  //'hel-bold red p-mxx'
  const namesArr = namesStr.trim().split(' ');
  const styles = namesArr.map((name: string) => (name && styleMap[name]) || {});
  return styles;
}

export const bs = buildStyles;

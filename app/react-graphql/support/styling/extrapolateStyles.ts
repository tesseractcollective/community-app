import _ from 'lodash';

export function extrapolateStyles(dictionary: any, cssProp: string, prefix = '', extraProps?: any) {
  const newStyles = {} as any;
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

import {filter} from 'lodash';

export function findDefaultPks(
  items: IJsonArray,
  newDetectedPks: Map<string, string[]> | undefined,
  detectedPks: Map<string, string[]>,
  key: string,
) {
  console.log('findDefaultPks -> key', key);
  console.log('findDefaultPks -> detectedPks', detectedPks);
  console.log('findDefaultPks -> newDetectedPks', newDetectedPks);
  console.log('findDefaultPks -> items', items);
  const item: any = items[0];
  const validPks = ['id'];
  const pks = filter(
    item.filter((_: any, key: string) => validPks.indexOf(key) >= 0),
  );
  if (pks.length === 1) {
    newDetectedPks = new Map(detectedPks);
    newDetectedPks.set(key, pks);
  }
  return newDetectedPks;
}

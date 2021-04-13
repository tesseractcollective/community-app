import {filter} from 'lodash';
import {HasuraDataConfig} from 'react-graphql/types/hasuraConfig';

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

export function findPkValueForItem(
  item: IJsonObject,
  config: HasuraDataConfig,
): {[key: string]: any} {
  console.log('findDefaultPks -> items', item);
  const validPks = config.primaryKey ?? ['id'];
  const pks = filter(item, (_: any, key: string) => validPks.indexOf(key) >= 0);
  console.log('pks', pks);
  let val;
  if (pks.length === 1) {
    val = pks[0];
  } else if (pks.length === 0) {
    console.log('❗ Err: No pk found on', item, config);
  } else {
    console.log(
      '❗ Err: Only mutations with a single primary key supported at this time',
      item,
      config,
    );
  }
  return val;
}

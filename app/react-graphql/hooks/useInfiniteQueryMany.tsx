import { useEffect, useMemo, useState } from 'react';
import { HasuraDataConfig } from 'types/hasuraConfig';
import { QueryMiddleware, QueryPostMiddlewareState, QueryPreMiddlewareState } from 'types/hookMiddleware';
import { findDefaultPks } from './findDefaultPks';
import { useUrqlQuery } from './useUrqlQuery';

interface IUseInfiniteQueryMany {
  sharedConfig: HasuraDataConfig;
  middleware: QueryMiddleware[];
  initialVariables?: IJsonObject;
}

export default function useInfiniteQueryMany<TData extends IJsonMapOfArraysObject, TVariables extends IJsonObject>(
  props: IUseInfiniteQueryMany,
) {
  const { sharedConfig, middleware, initialVariables } = props;

  const [meta, setMeta] = useState<{
    firstQueryCompleted: boolean;
    localError: string;
    queryError?: string;
    detectedPks: Map<any, any>;
  }>({ firstQueryCompleted: false, localError: '', detectedPks: new Map() });
  const [itemsMap, setItemsMap] = useState<Map<any, TData>>(new Map());
  const [needsReQuery, setNeedsReQuery] = useState<boolean>();
  const [objectVariables, setObjectVariables] = useState<{ [key: string]: any }>(initialVariables ?? {});

  //Guards
  if (!sharedConfig || !middleware?.length) {
    throw new Error('sharedConfig and at least one middleware required');
  }

  const reInitObjectVariables = (newVars: IJsonObject) => {
    setObjectVariables(newVars);
  };

  // Setup the initial query Config so it's for sure ready before we get to urql
  const queryCfg: QueryPostMiddlewareState = useMemo(() => {
    const _tmp = middleware.reduce(
      (val, next: QueryMiddleware) => {
        const mState: QueryPostMiddlewareState = next(val, sharedConfig);
        let newState = {};
        if (val) Object.assign(newState, val);
        Object.assign(newState, mState);
        return newState as QueryPostMiddlewareState;
      },
      {
        variables: objectVariables,
      } as QueryPreMiddlewareState,
    );

    const _queryCfg = _tmp as QueryPostMiddlewareState;
    return _queryCfg;
  }, [sharedConfig, middleware, objectVariables]);

  const [resp, reExecuteQuery] = useUrqlQuery<TData>(queryCfg, objectVariables);

  useEffect(() => {
    //How to reset to page 0
    if (needsReQuery) {
      console.log('reExecuteQuery - 80', queryCfg, objectVariables);
      setNeedsReQuery(false);
      reExecuteQuery();
    }
  }, [needsReQuery]);

  //Parse response
  useEffect(() => {
    if (resp.data) {
      // console.log('resp.data', resp.data);
      const data: IJsonMapOfArraysObject = resp.data;
      const keys = Object.keys(data);
      if (keys.length === 1) {
        const key = keys[0];
        //only single response category so use single layer items
        const items: IJsonArray = data[key];
        if (!items?.length) return;

        const { detectedPks } = meta;
        let newDetectedPks;
        let pk: string = detectedPks?.get(key);
        //detectPK
        if (!detectedPks.get(key)) {
          if (sharedConfig.primaryKey) {
            //TODO Use this
            newDetectedPks = new Map();
            newDetectedPks.set(key, sharedConfig.primaryKey);
            pk = sharedConfig.primaryKey?.[0];
          } else {
            //Move to utility function and check for registered regex
            newDetectedPks = findDefaultPks(items, newDetectedPks, detectedPks, key);
          }
        }

        let localError;
        if (!pk) {
          localError = 'Could not autodetect PK, please register pk patterns';
          setMeta({
            detectedPks: newDetectedPks ?? meta.detectedPks,
            firstQueryCompleted: true,
            localError,
          });
          return;
        }

        const newItems = new Map(itemsMap);
        items.forEach((itm: any) => newItems.set(itm[pk], itm));
        setItemsMap(newItems);
        setMeta({
          detectedPks: newDetectedPks ?? meta.detectedPks,
          firstQueryCompleted: true,
          localError: '',
        });
      } else if (keys.length > 1) {
        // TODO: We queried more than one top level table so we have to nest inside the map accordingly
      } else {
        setMeta({
          detectedPks: meta.detectedPks,
          firstQueryCompleted: true,
          localError: 'OOPSIE POOPSIE',
        });
      }
    }
  }, [resp.data]);

  //Update user items from map
  const results = useMemo(() => {
    if (itemsMap) {
      console.log('results -> itemsMap', itemsMap.size)
      const arrayOfItems: any = Array.from(itemsMap.values());
      return arrayOfItems;
    }
    return [];
  }, [itemsMap]);

  const reload = () => {
    setItemsMap(new Map());
    setNeedsReQuery(true);
  };
  const requeryKeepInfinite = () => {
    setNeedsReQuery(true);
  };

  return {
    resp,
    results,
    localError: meta.localError,
    setObjectVariables,
    objectVariables,
    reload,
    requeryKeepInfinite,
    reInitObjectVariables,
  };
}

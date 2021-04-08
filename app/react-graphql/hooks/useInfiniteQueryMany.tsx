import {isEqual} from 'lodash';
import {useCallback, useEffect, useState, useMemo} from 'react';
import {stateFromQueryMiddleware} from 'react-graphql/support/middlewareHelpers';
import {HasuraDataConfig} from '../types/hasuraConfig';
import {QueryMiddleware} from '../types/hookMiddleware';
import {findDefaultPks} from './findDefaultPks';
import {useUrqlQuery} from './useUrqlQuery';
import {useMonitorResult} from './monitorResult';

interface IUseInfiniteQueryMany {
  where?: {[key: string]: any};
  orderBy?: {[key: string]: any} | Array<{[key: string]: any}>;
  pageSize?: number;
  sharedConfig: HasuraDataConfig;
  middleware: QueryMiddleware[];
}

const defaultPageSize = 50;

export default function useInfiniteQueryMany<
  TData extends IJsonMapOfArraysObject
>(props: IUseInfiniteQueryMany) {
  const {sharedConfig, middleware, where, orderBy, pageSize} = props;

  const limit = pageSize ?? defaultPageSize;

  const [meta, setMeta] = useState<{
    firstQueryCompleted: boolean;
    localError: string;
    queryError?: string;
    detectedPks: Map<string, string[]>;
  }>({firstQueryCompleted: false, localError: '', detectedPks: new Map()});

  const [offset, setOffset] = useState(0);
  const [externalVariables, setExterneralVariables] = useState<any>({
    where,
    orderBy,
    limit,
    offset,
  });
  const [itemsMap, setItemsMap] = useState<Map<string, TData>>(new Map());
  const [shouldClearItems, setShouldClearItems] = useState(false);
  const [needsReQuery, setNeedsReQuery] = useState(false);

  useEffect(() => {
    const checkVariables = {where, orderBy, limit};
    if (!isEqual(externalVariables, checkVariables)) {
      setExterneralVariables(checkVariables);
      setOffset(0);
      setShouldClearItems(true);
    }
  }, [where, orderBy, limit]);

  //Guards
  if (!sharedConfig || !middleware?.length) {
    throw new Error('sharedConfig and at least one middleware required');
  }

  const [queryCfg, setQueryCfg] = useState(computeConfig);

  useEffect(() => {
    const newState = computeConfig();
    // console.log('useInfiniteQueryMany -> useEffect -> computeConfig -> newState', newState);
    setQueryCfg(newState);
  }, [externalVariables, offset]);

  // Setup the initial query Config so it's for sure ready before we get to urql
  const [queryState, reExecuteQuery] = useUrqlQuery<TData>(queryCfg);

  useEffect(() => {
    if (needsReQuery) {
      setNeedsReQuery(false);
      reExecuteQuery();
    }
  }, [needsReQuery]);

  useMonitorResult('query', queryState, queryCfg);

  //Parse response
  useEffect(() => {
    if (queryState.data) {
      const data: IJsonMapOfArraysObject = queryState.data;
      const keys = Object.keys(data);
      if (keys.length === 1) {
        const key = keys[0];
        //only single response category so use single layer items
        const queryItems: IJsonArray = data[key];
        if (!queryItems?.length) return;

        const {detectedPks} = meta;
        let newDetectedPks;
        let pks = detectedPks.get(key);
        //detectPK
        if (!pks) {
          if (sharedConfig.primaryKey) {
            newDetectedPks = new Map();
            newDetectedPks.set(key, sharedConfig.primaryKey);
          } else {
            //Move to utility function and check for registered regex
            newDetectedPks = findDefaultPks(
              queryItems,
              newDetectedPks,
              detectedPks,
              key,
            );
          }
          pks = newDetectedPks?.get(key);
        }

        let localError;
        if (!pks) {
          localError = 'Could not autodetect PK, please register pk patterns';
          setMeta({
            detectedPks: newDetectedPks ?? meta.detectedPks,
            firstQueryCompleted: true,
            localError,
          });
          return;
        }

        let newItemsMap = new Map(itemsMap);
        if (shouldClearItems) {
          newItemsMap = new Map();
          setShouldClearItems(false);
        }

        queryItems.forEach((item: any) => {
          const itemKey = pks!.map((pk) => item[pk]).join(':');
          newItemsMap.set(itemKey, item);
        });
        setItemsMap(newItemsMap);
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
  }, [queryState.data, shouldClearItems]);

  //Update user items from map
  const items = useMemo(() => {
    return Array.from(itemsMap.values());
  }, [itemsMap]);

  const loadNextPage = () => {
    if (!queryState.fetching) {
      if (items?.length && items?.length % limit === 0) {
        setOffset(offset + limit);
      }
    }
  };

  const refresh = useCallback(() => {
    setOffset(0);
    setShouldClearItems(true);
    setNeedsReQuery(true);
  }, []);
  
  const requeryKeepInfinite = () => {
    setNeedsReQuery(true);
  };

  return {
    queryState,
    items,
    localError: meta.localError,
    refresh,
    loadNextPage,
    requeryKeepInfinite,
  };

  function computeConfig() {
    const variables = {...externalVariables, offset};
    return stateFromQueryMiddleware({variables}, middleware, sharedConfig);
  }
}

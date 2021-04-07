import {useCallback, useEffect, useMemo, useState} from 'react';
import {HasuraDataConfig} from '../types/hasuraConfig';
import {
  QueryMiddleware,
  QueryPostMiddlewareState,
  QueryPreMiddlewareState,
} from '../types/hookMiddleware';
import {findDefaultPks} from './findDefaultPks';
import {useUrqlQuery} from './useUrqlQuery';

interface IUseInfiniteQueryMany {
  sharedConfig: HasuraDataConfig;
  middleware: QueryMiddleware[];
  variables?: IJsonObject;
}

const stateFromMiddleware = (
  preState: QueryPreMiddlewareState,
  middleware: QueryMiddleware[],
  config: HasuraDataConfig,
  index = 0,
): QueryPostMiddlewareState => {
  if (middleware.length === 0) {
    throw new Error('no middleware');
  }
  const postState = middleware[index](preState, config);
  if (index === middleware.length - 1) {
    return postState;
  }
  return stateFromMiddleware(
    {variables: postState.variables},
    middleware,
    config,
    index + 1,
  );
};

export default function useInfiniteQueryMany<
  TData extends IJsonMapOfArraysObject
>(props: IUseInfiniteQueryMany) {
  const {sharedConfig, middleware, variables} = props;

  const [meta, setMeta] = useState<{
    firstQueryCompleted: boolean;
    localError: string;
    queryError?: string;
    detectedPks: Map<string, string[]>;
  }>({firstQueryCompleted: false, localError: '', detectedPks: new Map()});

  const [itemsMap, setItemsMap] = useState<Map<string, TData>>(new Map());
  const [shouldClearItems, setShouldClearItems] = useState(false);
  const [needsReQuery, setNeedsReQuery] = useState(false);
  const [objectVariables, setObjectVariables] = useState<IJsonObject>({});

  useEffect(() => {
    if (variables) {
      setObjectVariables(variables);
    }
    
  }, [variables]);

  //Guards
  if (!sharedConfig || !middleware?.length) {
    throw new Error('sharedConfig and at least one middleware required');
  }

  // Setup the initial query Config so it's for sure ready before we get to urql
  const queryCfg = useMemo(() => {
    const preState: QueryPreMiddlewareState = {
      variables: objectVariables,
    };
    return stateFromMiddleware(preState, middleware, sharedConfig);
  }, [sharedConfig, middleware, objectVariables]);

  const [queryState, reExecuteQuery] = useUrqlQuery<TData>(
    queryCfg,
    objectVariables,
  );

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
    console.log('items -> itemsMap', itemsMap.size);
    return Array.from(itemsMap.values());
  }, [itemsMap]);

  const clear = useCallback(() => {
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
    setObjectVariables,
    objectVariables,
    clear,
    requeryKeepInfinite,
  };
}

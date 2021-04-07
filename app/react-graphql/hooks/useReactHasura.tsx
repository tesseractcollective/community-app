import React, { useState, useEffect, useCallback } from 'react';

import useMutate from './useMutate';
import { createDeleteMutation, createInsertMutation, createUpdateMutation } from './useMutate.utils';
import useInfiniteQueryMany from './useInfiniteQueryMany';
import { createInfiniteQueryMany, usePagination } from './useInfiniteQueryMany.utils';
import useQueryOne from './useQueryOne';
import { createQueryOne } from './useQueryOne.utils';
import { MutationMiddleware, QueryMiddleware } from '../types/hookMiddleware';
import { HasuraDataConfig } from '../types/hasuraConfig';

export default function useReactHasura(config: HasuraDataConfig) {
  return {
    useInsert: (props: { initialVariables?: IJsonObject; middleware?: MutationMiddleware[] }) =>
      useMutate({
        sharedConfig: config,
        middleware: props.middleware || [createInsertMutation],
        initialVariables: props.initialVariables,
      }),
    useDelete: (props: { initialVariables?: IJsonObject; middleware?: MutationMiddleware[] }) =>
      useMutate({
        sharedConfig: config,
        middleware: props.middleware || [createDeleteMutation],
        initialVariables: props.initialVariables,
      }),
    useUpdate: (props: { initialVariables?: IJsonObject; middleware?: MutationMiddleware[] }) =>
      useMutate({
        sharedConfig: config,
        middleware: props.middleware || [createUpdateMutation],
        initialVariables: props.initialVariables,
      }),
    useInfiniteQueryMany: (props: { variables?: IJsonObject; 
      pageSize?: number; middleware?: QueryMiddleware[] }) => {
      const { refresh: refreshPagination, loadNextPage, middleware: paginationMiddleware } = usePagination(
        props?.pageSize as number,
      );

      const [middlewares, setMiddlewares] = useState(
        props.middleware || [paginationMiddleware, createInfiniteQueryMany],
      );

      const q = useInfiniteQueryMany({
        sharedConfig: config,
        middleware: middlewares,
        variables: props.variables,
      });

      useEffect(() => {
        if (!props.middleware && paginationMiddleware && paginationMiddleware !== middlewares?.[0]) {
          setMiddlewares([paginationMiddleware, createInfiniteQueryMany]);
        }
      }, [props.middleware, paginationMiddleware]);

      const { clear, ...rest } = q;
      const refresh = useCallback(() => {
        clear();
        refreshPagination();
      }, [clear, refreshPagination]);

      return {
        ...rest,
        refresh,
        loadNextPage,
      };
    },
    useQueryOne: (props: { initialVariables?: IJsonObject; middleware: QueryMiddleware[] }) =>
      useQueryOne({
        sharedConfig: config,
        middleware: props.middleware || [createQueryOne],
        initialVariables: props.initialVariables,
      }),
  };
}

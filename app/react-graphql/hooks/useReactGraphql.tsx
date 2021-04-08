import React from 'react';

import useMutate from './useMutate';
import {
  createDeleteMutation,
  createInsertMutation,
  createUpdateMutation,
} from './useMutate.utils';
import useInfiniteQueryMany from './useInfiniteQueryMany';
import {
  createInfiniteQueryMany,
} from './useInfiniteQueryMany.utils';
import useQueryOne from './useQueryOne';
import {createQueryOne} from './useQueryOne.utils';
import {MutationMiddleware, QueryMiddleware} from '../types/hookMiddleware';
import {HasuraDataConfig} from '../types/hasuraConfig';

export default function useReactGraphql(config: HasuraDataConfig) {
  return {

    useInsert: (props?: {
      initialVariables?: IJsonObject;
      middleware?: MutationMiddleware[];
    }) =>
      useMutate({
        sharedConfig: config,
        middleware: props?.middleware || [createInsertMutation],
        initialVariables: props?.initialVariables,
      }),

    useDelete: (props?: {
      initialVariables?: IJsonObject;
      middleware?: MutationMiddleware[];
    }) =>
      useMutate({
        sharedConfig: config,
        middleware: props?.middleware || [createDeleteMutation],
        initialVariables: props?.initialVariables,
      }),

    useUpdate: (props?: {
      initialVariables?: IJsonObject;
      middleware?: MutationMiddleware[];
    }) =>
      useMutate({
        sharedConfig: config,
        middleware: props?.middleware || [createUpdateMutation],
        initialVariables: props?.initialVariables,
      }),

    useInfiniteQueryMany: (props?: {
      where?: {[key: string]: any};
      orderBy?: {[key: string]: any} | Array<{[key: string]: any}>;
      pageSize?: number;
      middleware?: QueryMiddleware[];
    }) =>
      useInfiniteQueryMany({
        where: props?.where,
        orderBy: props?.orderBy,
        sharedConfig: config,
        middleware: props?.middleware || [createInfiniteQueryMany],
      }),

    useQueryOne: (props?: {
      initialVariables?: IJsonObject;
      middleware: QueryMiddleware[];
    }) =>
      useQueryOne({
        sharedConfig: config,
        middleware: props?.middleware || [createQueryOne],
        initialVariables: props?.initialVariables,
      }),
  };
}

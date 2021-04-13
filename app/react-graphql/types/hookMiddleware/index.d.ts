import {DocumentNode} from 'graphql';
import {HasuraDataConfig} from 'types/hasuraConfig';

export interface QueryMiddleware {
  (
    state: QueryPreMiddlewareState,
    config: HasuraDataConfig,
  ): QueryPostMiddlewareState;
}

export interface QueryPreMiddlewareState {
  document?: DocumentNode;
  variables: IJsonObject;
  operationName?: string;
}

export interface QueryPostMiddlewareState {
  document: DocumentNode;
  variables: IJsonObject;
  operationName: string;
}

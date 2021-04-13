import {DocumentNode} from 'graphql';
import {HasuraDataConfig} from 'types/hasuraConfig';

interface QueryMiddleware {
  (
    state: QueryPreMiddlewareState,
    config: HasuraDataConfig,
  ): QueryPostMiddlewareState;
}

interface QueryPreMiddlewareState {
  query?: DocumentNode | string;
  queryStr?: string;
  variables: IJsonObject;
  operationName?: string;
}
interface QueryPostMiddlewareState {
  query: DocumentNode;
  queryStr?: string;
  variables: IJsonObject;
  operationName: string;
}

interface MutationMiddleware {
  (
    state: MutationPreMiddlewareState,
    config: HasuraDataConfig,
  ): MutationPostMiddlewareState;
}

interface MutationPreMiddlewareState {
  mutation?: DocumentNode;
  mutationStr?: string;
  variables?: IJsonObject;
  operationName?: string;
}
interface MutationPostMiddlewareState {
  mutation: DocumentNode;
  mutationStr?: string;
  variables: IJsonObject;
  operationName: string;
}

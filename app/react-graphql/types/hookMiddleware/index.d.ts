import { DocumentNode } from "graphql";
import { HasuraDataConfig } from "types/hasuraConfig";

interface QueryMiddleware {
  (state: QueryPreMiddlewareState, config: HasuraDataConfig): QueryPostMiddlewareState;
}

interface QueryPreMiddlewareState {
  query?: DocumentNode | string;
  variables: IJsonObject;
  operationName?: string;
}
interface QueryPostMiddlewareState {
  query: DocumentNode;
  variables: IJsonObject;
  operationName: string;
}

interface MutationMiddleware {
  (state: MutationPreMiddlewareState, config: HasuraDataConfig): MutationPostMiddlewareState;
}

interface MutationPreMiddlewareState {
  mutation?: DocumentNode;
  variables?: IJsonObject;
  operationName?: string;
}
interface MutationPostMiddlewareState {
  mutation: DocumentNode;
  variables: IJsonObject;
  operationName: string;
}

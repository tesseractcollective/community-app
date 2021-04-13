// //THESE ARE THE 4 CORE SCENARIOS
// SingleItem (single item)
// Button | Function (delete)
// PaginatedList (many)
// Form (insert & updates)

import {DocumentNode} from 'graphql';

export default interface HasuraConfigType {
  [key: string]: HasuraDataConfig;
}

export interface HasuraDataConfig {
  typename: string;
  primaryKey: string[];
  fieldFragment: DocumentNode;
  primaryKeyRequiredOnCreate?: boolean;
  overrides?: {
    operationNames?: {
      query_many?: string;
      query_aggregate?: string;
      query_by_pk?: string;
      delete_by_pk?: string;
      insert?: string;
      insert_core_one?: string;
      update_core?: string;
    };
    fieldFragments?: {
      query_many?: DocumentNode;
      query_aggregate?: DocumentNode;
      query_by_pk?: DocumentNode;
      delete_by_pk?: DocumentNode;
      insert?: DocumentNode;
      insert_core_one?: DocumentNode;
      update_core?: DocumentNode;
    };
  };
}

// //THESE ARE THE 4 CORE SCENARIOS
// SingleItem (single item)
// Button | Function (delete)
// PaginatedList (many)
// Form (insert & updates)

import {DocumentNode} from 'graphql';
import {getFragmentName} from './graphqlHelpers';

export default interface HasuraConfigType {
  [key: string]: HasuraDataConfig;
}

export const keyExtractor = (
  config: HasuraDataConfig,
  item: {[key: string]: any},
): string => {
  return config.primaryKey.map((key) => item[key]).join(':');
};

export const getFieldFragmentInfo = (
  config: HasuraDataConfig,
  override?: DocumentNode,
): {fragment: DocumentNode; fragmentName: string} => {
  const fragment = override || config.fieldFragment;
  const fragmentName = getFragmentName(fragment);
  if (!fragmentName) {
    throw new Error('DocumentNode set as fieldFragment is not a fragment');
  }
  return {fragment, fragmentName};
};

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

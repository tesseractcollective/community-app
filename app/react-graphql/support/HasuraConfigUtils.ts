// //THESE ARE THE 4 CORE SCENARIOS
// SingleItem (single item)
// Button | Function (delete)
// PaginatedList (many)
// Form (insert & updates)

import { DocumentNode } from 'graphql';
import { HasuraDataConfig } from 'types/hasuraConfig';
import { getFragmentName } from './graphqlHelpers';

export const keyExtractor = (config: HasuraDataConfig, item: { [key: string]: any }): string => {
  return config.primaryKey.map((key) => item[key]).join(':');
};

export const getFieldFragmentInfo = (
  config: HasuraDataConfig,
  override?: DocumentNode,
): { fragment: DocumentNode; fragmentName: string } => {
  const fragment = override || config.fieldFragment;
  const fragmentName = getFragmentName(fragment);
  if (!fragmentName) {
    throw new Error('DocumentNode set as fieldFragment is not a fragment');
  }
  return { fragment, fragmentName };
};

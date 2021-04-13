import { createInsertMutation } from 'react-graphql/hooks/useMutate.utils';
import HasuraConfig from './TestHasuraConfig';

describe('useMutateMiddleware', () => {
  it('creates insert middleware', () => {
    const state = { variables: { reaction: "LIKE" } }
    const insertMiddleware = createInsertMutation(state, HasuraConfig.userPostReactions);
    expect(insertMiddleware.variables.object).toBeDefined();
    expect(insertMiddleware.variables.object.reaction).toEqual("LIKE");
  });

  
});

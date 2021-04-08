import { buildClientSchema } from 'graphql';
import IntrospectionQuery from './generated/graphql';

export * from './generated/graphql';
export { IntrospectionQuery };
export const graphqlSchema = buildClientSchema(IntrospectionQuery);

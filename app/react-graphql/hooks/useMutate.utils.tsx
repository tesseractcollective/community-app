import {getFieldFragmentInfo} from '../support/HasuraConfigUtils';
import {print} from 'graphql';
import gql from 'graphql-tag';
import {
  QueryPostMiddlewareState,
  QueryPreMiddlewareState,
} from '../types/hookMiddleware';
import {HasuraDataConfig} from '../types/hasuraConfig';

function createArgsString(state: QueryPreMiddlewareState, config: HasuraDataConfig): string {
  return config.primaryKey
    .map((key) => {
      let argValue = state.variables?.[key];
      if (typeof argValue === 'string') {
        argValue = `"${argValue}"`;
      }
      return `${key}:${argValue}`
    })
    .join(', ');
}

export function createDeleteMutation(
  state: QueryPreMiddlewareState,
  config: HasuraDataConfig,
): QueryPostMiddlewareState {
  const name = config.typename;
  const operationName =
    config.overrides?.operationNames?.delete_by_pk ?? `delete_${name}_by_pk`;

  const {fragment, fragmentName} = getFieldFragmentInfo(
    config,
    config.overrides?.fieldFragments?.delete_by_pk,
  );

  const args = createArgsString(state, config);

  const mutationStr = `mutation ${name}DeleteMutation {
      ${operationName}(${args}) {
        ...${fragmentName}
      }
    }
    ${print(fragment)}`;
  const document = gql(mutationStr);

  return {document, operationName, variables: {}};
}

export function createInsertMutation(
  state: QueryPreMiddlewareState,
  config: HasuraDataConfig,
): QueryPostMiddlewareState {
  const name = config.typename;
  const {fragment, fragmentName} = getFieldFragmentInfo(
    config,
    config.overrides?.fieldFragments?.insert_core_one,
  );

  const onConflictVariable = config.overrides?.onConflict?.insert
    ? `, $onConflict:${name}_on_conflict`
    : '';
  const onConflictArg = config.overrides?.onConflict?.insert_args
    ? ', on_conflict:$onConflict'
    : '';

  const operationName =
    config.overrides?.operationNames?.insert_one ?? `insert_${name}_one`;
  const mutationStr = `mutation ${name}Mutation($object:${name}_insert_input!${onConflictVariable}) {
    ${operationName}(object:$object${onConflictArg}) {
      ...${fragmentName}
    }
  }
  ${print(fragment)}`;
  const document = gql(mutationStr);

  const variables = {object: {...state.variables}};

  return {document, operationName, variables};
}

export function createUpdateMutation(
  state: QueryPreMiddlewareState,
  config: HasuraDataConfig,
): QueryPostMiddlewareState {
  const name = config.typename;
  const {fragment, fragmentName} = getFieldFragmentInfo(
    config,
    config.overrides?.fieldFragments?.update_core,
  );

  const operationName =
    config.overrides?.operationNames?.update_by_pk ?? `update_${name}_by_pk`;

  const args = createArgsString(state, config);

  const mutationStr = `mutation ${name}Mutation($object:${name}_set_input!) {
    ${operationName}(pk_columns: {${args}} _set:$object ) {
      ...${fragmentName}
    }
  }
  ${print(fragment)}`;

  const document = gql(mutationStr);

  const variables = {object: {...state.variables}};
  delete variables.object.id;

  return {document, operationName, variables};
}

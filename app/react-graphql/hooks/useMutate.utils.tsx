import {getFieldFragmentInfo} from '../support/HasuraConfigUtils';
import {print} from 'graphql';
import gql from 'graphql-tag';
import {
  MutationPostMiddlewareState,
  MutationPreMiddlewareState,
} from '../types/hookMiddleware';
import {HasuraDataConfig} from '../types/hasuraConfig';

export function createDeleteMutation(
  state: MutationPreMiddlewareState,
  config: HasuraDataConfig,
): MutationPostMiddlewareState {
  const name = config.typename;
  const operationName =
    config.overrides?.operationNames?.delete_by_pk ?? `delete_${name}_by_pk`;
  const args = config.primaryKey
    .map((key) => `${key}:"${state.variables?.[key]}"`)
    .join(', ');

  const {fragment, fragmentName} = getFieldFragmentInfo(
    config,
    config.overrides?.fieldFragments?.delete_by_pk,
  );

  const mutationStr = `mutation ${name}DeleteMutation {
      ${operationName}(${args}) {
        ...${fragmentName}
      }
    }
    ${print(fragment)}`;
  const mutation = gql(mutationStr);

  const pkColumns: {[key: string]: any} = {};
  for (const key of config.primaryKey) {
    pkColumns[key] = state.variables?.[key];
  }

  let variables =
    operationName === `delete_${name}_by_pk`
      ? {}
      : {object: {...state.variables}};
  // console.log('🚦 state.variables', state.variables);

  return {mutation, mutationStr, operationName, variables, pkColumns};
}

export function createInsertMutation(
  state: MutationPreMiddlewareState,
  config: HasuraDataConfig,
): MutationPostMiddlewareState {
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
  const mutation = gql(mutationStr);

  const pkColumns: {[key: string]: any} = {};
  for (const key of config.primaryKey) {
    pkColumns[key] = state.variables?.[key];
  }

  const variables = {object: {...state.variables}};
  delete variables.object.id;
  // console.log('🚦 state.variables', state.variables);

  // console.log('🚦 variables', variables);
  return {mutation, mutationStr, operationName, variables, pkColumns};
}

export function createUpdateMutation(
  state: MutationPreMiddlewareState,
  config: HasuraDataConfig,
): MutationPostMiddlewareState {
  const name = config.typename;
  const {fragment, fragmentName} = getFieldFragmentInfo(
    config,
    config.overrides?.fieldFragments?.update_core,
  );

  const operationName =
    config.overrides?.operationNames?.update_by_pk ?? `update_${name}_by_pk`;

  const _id = state?.variables?.id;

  const mutationStr = `mutation ${name}Mutation($object:${name}_set_input!) {
    ${operationName}(pk_columns: {id: "${_id}"} _set:$object ) {
      ...${fragmentName}
    }
  }
  ${print(fragment)}`;

  const mutation = gql(mutationStr);

  const pkColumns: {[key: string]: any} = {};
  for (const key of config.primaryKey) {
    pkColumns[key] = state.variables?.[key];
  }

  const variables = {object: {...state.variables}};
  delete variables.object.id;

  return {mutation, mutationStr, operationName, variables, pkColumns};
}

import React, {useCallback, useState} from 'react';
import {useMutation} from 'urql';
import {print} from 'graphql';
import {Button, ButtonProps, Input, InputProps} from 'react-native-elements';

import {
  getFieldFragmentInfo,
  HasuraDataConfig,
} from 'graphql-api/HasuraConfigType';
import {useTranslations} from 'components/TranslationProvider';

export interface UseMutatorProps<T> {
  config: HasuraDataConfig;
  item?: T;
  variables?: {[key: string]: any};
  onConflict?: {[key: string]: any};
  afterMutationCallback?: () => void;
}

export interface Mutator {
  item: {[key: string]: any};
  setVariable: (key: string, value: any) => void;
  save: () => void;
  deleteAction?: () => void;
}

export interface MutatorState<T> {
  resultItem?: T;
  error?: Error;
  mutating: boolean;
}

interface MutationConfig {
  mutation: string;
  operationName: string;
  pkColumns?: {[key: string]: any};
}

function createDeleteMutation(
  item: {[key: string]: any},
  config: HasuraDataConfig,
): MutationConfig {
  const name = config.typename;
  const {fragment, fragmentName} = getFieldFragmentInfo(
    config,
    config.overrides?.fieldFragments?.delete_by_pk,
  );

  const operationName =
    config.overrides?.operationNames?.delete_by_pk || `delete_${name}_by_pk`;
  const args = config.primaryKey
    .map((key) => {
      let value = item[key];
      if (typeof value === 'string') {
        value = `"${value}"`;
      }
      return `${key}:${value}`;
    })
    .join(', ');
  const mutation = `mutation ${name}DeleteMutation {
      ${operationName}(${args}) {
        ...${fragmentName}
      }
    }
    ${print(fragment)}`;

  return {mutation, operationName};
}

function createInsertMutation(
  config: HasuraDataConfig,
  onConflict?: {[key: string]: any},
): MutationConfig {
  const name = config.typename;
  const {fragment, fragmentName} = getFieldFragmentInfo(
    config,
    config.overrides?.fieldFragments?.insert_core_one,
  );

  const onConflictVariable = onConflict
    ? `, $onConflict:${name}_on_conflict`
    : '';
  const onConflictArg = onConflict ? ', on_conflict:$onConflict' : '';

  const operationName =
    config.overrides?.operationNames?.insert_core_one || `insert_${name}_one`;
  const mutation = `mutation ${name}Mutation($object:${name}_insert_input!${onConflictVariable}) {
    ${operationName}(object:$object${onConflictArg}) {
      ...${fragmentName}
    }
  }
  ${print(fragment)}`;

  return {mutation, operationName};
}

function createUpdateMutation(
  item: {[key: string]: any},
  config: HasuraDataConfig,
): MutationConfig {
  const name = config.typename;
  const {fragment, fragmentName} = getFieldFragmentInfo(
    config,
    config.overrides?.fieldFragments?.update_core,
  );

  const operationName =
    config.overrides?.operationNames?.update_core || `update_${name}_by_pk`;
  const mutation = `mutation ${name}Mutation($object:${name}_set_input!) {
    ${operationName}(_set:$object) {
      ...${fragmentName}
    }
  }
  ${print(fragment)}`;

  const pkColumns: {[key: string]: any} = {};
  for (const key of config.primaryKey) {
    pkColumns[key] = item[key];
  }

  return {mutation, operationName, pkColumns};
}

function useMutator<T extends {[key: string]: any}>(
  props: UseMutatorProps<T>,
): {mutator: Mutator; state: MutatorState<T>} {
  const {config, item, variables, onConflict, afterMutationCallback} = props;

  const deleteConfig = createDeleteMutation(item || {}, config);
  let operationName: string;
  let mutation: string;
  let pkColumns: {[key: string]: any} | undefined;
  if (item) {
    const mutationConfig = createUpdateMutation(item, config);
    operationName = mutationConfig.operationName;
    mutation = mutationConfig.mutation;
    pkColumns = mutationConfig.pkColumns;
  } else {
    const mutationConfig = createInsertMutation(config, onConflict);
    operationName = mutationConfig.operationName;
    mutation = mutationConfig.mutation;
    pkColumns = mutationConfig.pkColumns;
  }

  const [mutationResult, executeMutation] = useMutation(mutation);
  const [deleteResult, executeDelete] = useMutation(deleteConfig.mutation);
  const [objectVariables, setObjectVariables] = useState<{[key: string]: any}>({
    ...item,
    ...variables,
  });

  const save = useCallback(async () => {
    const object = {
      ...variables, // in case something passed in changed
      ...objectVariables,
    };
    await executeMutation({
      object: object,
      pkColumns,
      onConflict: item ? undefined : onConflict,
    });
    if (afterMutationCallback) {
      afterMutationCallback();
    }
  }, [objectVariables, variables]);

  const deleteAction = item
    ? () => {
        executeDelete().then(() => {});
        if (afterMutationCallback) {
          afterMutationCallback();
        }
      }
    : undefined;

  const resultItem = mutationResult.data
    ? mutationResult.data[operationName]
    : undefined;

  const deleteResultItem = deleteResult.data
    ? deleteResult.data[deleteConfig.operationName]
    : undefined;

  const setVariable = (key: string, value: any) => {
    setObjectVariables({
      ...objectVariables,
      [key]: value,
    });
  };

  return {
    mutator: {
      item: variables || {},
      save,
      setVariable,
      deleteAction,
    },
    state: {
      resultItem: resultItem || deleteResultItem,
      error: mutationResult.error || deleteResult.error,
      mutating: mutationResult.fetching || deleteResult.fetching,
    },
  };
}

// function inputForType(mutator: Mutator, type: TypeNode, isRequired = false) {
//   if (type.kind === 'NonNullType') {
//     return inputForType(mutator, type.type, true);
//   }
//   if (type.kind === 'ListType') {
//     throw new Error('List types not supported yet');
//   }
//   if (type.kind === 'NamedType') {
//     switch (type.name.value) {
//       case 'Boolean':
//       case 'Int':
//       case 'Float':
//       case 'float8':
//       case 'timestamptz':
//       case 'jsonb':
//       case 'json':
//       case 'ID':
//       case 'uuid':
//       case 'String':
//       default: {
//         const graphqlType = mutator.schema.getType(type.name.value);
//         if (isScalarType(graphqlType)) {
//           // just use default input
//           return Input;
//         } else if (isObjectType(graphqlType)) {
//           // TODO: create form with type
//         }
//       }
//     }
//   }
// }

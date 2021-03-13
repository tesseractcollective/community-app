import {useCallback, useState} from 'react';
import {DocumentNode, TypeNode} from 'graphql';
import {useMutation} from 'urql';
import {Button, ButtonProps, Input} from 'react-native-elements';

import {
  getResultFieldName,
  getVariableDefinition,
  isMutation,
} from '../graphql/graphqlHelpers';

export interface UseMutatorProps {
  document: DocumentNode;
}

export interface WithDocument {
  document: DocumentNode;
  [key: string]: any;
}

export interface Mutator {
  document: DocumentNode;
  setVariable: (key: string, value: any) => void;
  save: () => void;
}

export interface MutatorState<T> {
  resultItem?: T;
  error?: Error;
  saving: boolean;
}

export function useMutator<T>(
  props: UseMutatorProps,
): {mutator: Mutator; state: MutatorState<T>} {
  const {document} = props;

  const resultField = getResultFieldName(document);
  if (!isMutation(document) || !resultField) {
    throw new Error('GraphQL document must be a mutation');
  }

  const [mutationResult, executeMutation] = useMutation(document);
  const [variables, setVariables] = useState<{[key: string]: any}>({});

  const save = useCallback(async () => {
    await executeMutation(variables);
  }, [document, variables]);

  const resultItem =
    mutationResult.data && resultField
      ? (mutationResult.data as any)[resultField]
      : undefined;

  const setVariable = (key: string, value: any) => {
    setVariables({
      ...variables,
      [key]: value,
    });
  };

  return {
    mutator: {
      document,
      save,
      setVariable,
    },
    state: {
      resultItem,
      error: mutationResult.error,
      saving: mutationResult.fetching,
    },
  };
}

export interface MutatorInputProps {
  mutator: Mutator;
  input: string;
}

export interface MutatorSaveProps {
  mutator: Mutator;
}

function inputForType(type: TypeNode, isRequired = false, isList = false) {
  if (type.kind === 'NonNullType') {
    return inputForType(type.type, true, isList);
  }
  if (type.kind === 'ListType') {
    return inputForType(type.type, isRequired, true);
  }
  if (type.kind === 'NamedType') {
    switch (type.name.value) {
      case 'Boolean':
      case 'Int':
      case 'Float':
      case 'float8':
      case 'timestamptz':
      case 'jsonb':
      case 'json':
      case 'ID':
      case 'uuid':
      case 'String':
      default:
        return Input
    }
  }
}

export function MutatorInput(props: MutatorInputProps) {
  const {mutator, input} = props;

  const definition = getVariableDefinition(mutator.document, input);
  if (!definition) {
    throw new Error(`GraphQL mutation does not have variable ${input}`);
  }

  return inputForType(definition.type);
}

export function MutatorSaveButton(props: MutatorSaveProps & ButtonProps) {
  const {mutator, ...rest} = props;
  return <Button {...rest} onPress={mutator.save} />;
}

export interface GraphQLFieldElementProps {
  withDocument: WithDocument;
  input: string;
}

export function GraphQLFieldElement(props: GraphQLFieldElementProps) {
  const {withDocument, input} = props;

  const definition = getVariableDefinition(withDocument.document, input);
  if (!definition) {
    throw new Error(`GraphQL document does not have variable ${input}`);
  }
}

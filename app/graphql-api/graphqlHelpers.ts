import {
  DocumentNode,
  VariableDefinitionNode,
} from 'graphql';

export function isMutation(document: DocumentNode) {
  const node = document.definitions[0];
  return node?.kind === 'OperationDefinition' && node.operation === 'mutation';
}

export function isQuery(document: DocumentNode) {
  const node = document.definitions[0];
  return node?.kind === 'OperationDefinition' && node.operation === 'query';
}

export function isFragment(document: DocumentNode) {
  const node = document.definitions[0];
  return node?.kind === 'FragmentDefinition';
}

export function getVariableDefinition(document: DocumentNode, name: string): VariableDefinitionNode | undefined {
  return getVariableDefinitions(document)?.find(d => d.variable.name.value === name);
}

export function getVariableDefinitions(document: DocumentNode): ReadonlyArray<VariableDefinitionNode> | undefined {
  for (const definition of document.definitions) {
    if (definition.kind === 'OperationDefinition') {
      return definition.variableDefinitions;
    }
  }
  return undefined;
}

export function getFragmentName(document: DocumentNode): string | undefined {
  for (const definition of document.definitions) {
    if (definition.kind === 'FragmentDefinition') {
      return definition.name.value;
    }
  }
  return undefined;
}

export function hasVariableDefinition(document: DocumentNode, name: string) {
  return getVariableDefinition(document, name) !== undefined;
}

export function getResultFieldName(document: DocumentNode): string | undefined {
  const operation = document.definitions[0];
  if (operation?.kind === 'OperationDefinition') {
    const field = operation.selectionSet.selections[0];
    if (field?.kind === 'Field') {
      return field.name.value;
    }
  }
  return undefined;
}



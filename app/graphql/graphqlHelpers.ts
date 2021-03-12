import {
  DefinitionNode,
  OperationDefinitionNode,
  VariableDefinitionNode,
} from 'graphql';

export function isQuery(node: DefinitionNode | undefined): node is OperationDefinitionNode {
  if (node?.kind === 'OperationDefinition' && node.operation === 'query') {
    return true;
  }
  return false;
}

export function hasVariableDefinition(
  definitions: ReadonlyArray<VariableDefinitionNode> | undefined,
  name: string,
) {
  const definition = definitions?.find((d) => d.variable.name.value === name);
  return definition !== undefined;
}

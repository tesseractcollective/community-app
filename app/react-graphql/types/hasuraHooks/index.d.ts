import { OperationContext } from "@urql/core";
import { HasuraDataConfig } from "types/hasuraConfig";

interface UseMutatorProps<T> {
  config: HasuraDataConfig;
  initialVariables?: { [key: string]: any };
  onConflict?: { [key: string]: any };
  networkContext?: Partial<OperationContext>;
}

interface Mutator {
  setVariable: (key: string, value: any) => void;
  save: () => void;
  deleteAction?: () => void;
}

interface MutatorState<T> {
  resultItem?: T;
  error?: Error;
  mutating: boolean;
}

interface MutationConfig {
  mutation: string;
  operationName: string;
  pkColumns?: { [key: string]: any };
}

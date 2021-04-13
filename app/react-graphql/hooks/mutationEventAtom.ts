import {atom} from 'jotai';

interface IMutationEventPayload {
  [key: string]: any;
}

interface IMutationInsertEvent {
  listKey?: string;
  type: 'insert-first' | 'insert-last';
  key: string;
  payload: IMutationEventPayload;
}
interface IMutationDeleteEvent {
  listKey?: string;
  type: 'delete';
  key: string;
}
interface IMutationUpdateEvent {
  listKey?: string;
  type: 'update';
  key: string;
  payload: IMutationEventPayload;
}
interface IMutationInitEvent {
  listKey?: string;
  type: 'init';
  key: 'init';
}

export type IMutationEvent =
  | IMutationInsertEvent
  | IMutationDeleteEvent
  | IMutationUpdateEvent
  | IMutationInitEvent;

export const mutationEventAtom = atom<IMutationEvent>({
  type: 'init',
  key: 'init',
});

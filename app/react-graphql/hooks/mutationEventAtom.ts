import {atom} from 'jotai';

interface IMutationEventPayload {
  [key: string]: any;
}

interface IMutationInsertEvent {
  listKey?: string;
  type: 'insert-first' | 'insert-last';
  pk: any;
  payload: IMutationEventPayload;
}
interface IMutationDeleteEvent {
  listKey?: string;
  type: 'delete';
  pk: any;
}
interface IMutationUpdateEvent {
  listKey?: string;
  type: 'update';
  pk: any;
  payload: IMutationEventPayload;
}
interface IMutationInitEvent {
  type: 'init';
}

export type IMutationEvent =
  | IMutationInsertEvent
  | IMutationDeleteEvent
  | IMutationUpdateEvent
  | IMutationInitEvent;

export const mutationEventAtom = atom<IMutationEvent>({
  type: 'init',
});

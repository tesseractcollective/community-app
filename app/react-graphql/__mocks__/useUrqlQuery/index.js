import useQueryResults from './useQueryResults';

export default function useUrqlQueryMock(queryCfg, objectVariables) {
  if (queryCfg.instanceId) {
    return useQueryResults[queryCfg.instanceId];
  }
  return [{}, () => null];
}

import { print } from 'graphql';
import {useEffect} from 'react';
import {
  QueryPostMiddlewareState,
} from '../types/hookMiddleware';

export function useMonitorResult(
  resultType: 'mutation' | 'query',
  result: any,
  cfg: QueryPostMiddlewareState,
) {
  useEffect(() => {
    if (result.error) {
      console.log(
        `❗ ERR: ${resultType} RESULT`,
        '\r\n',
        '------------------------',
        '\r\n',
        print(cfg.document),
        '\r\n',
        '------------------------',
        '\r\n',
        JSON.stringify(
          {
            error: result.error.message,
            errors: result.error.graphQLErrors,
            variables: result.operation?.variables,
          },
          null,
          2,
        ),
      );
    } else if (!result.fetching && result.data) {
      const keys = Object.keys(result.data);
      if (keys.length === 1) {
        const key = keys[0];
        //only single response category so use single layer items
        const queryItems: IJsonArray = result.data[key];
        if (Array.isArray(queryItems) && queryItems.length === 0) {
          console.log(
            `❗ WARN: ${resultType} EMPTY RESULTS`,
            '\r\n',
            '------------------------',
            '\r\n',
            print(cfg.document),
            '\r\n',
            '------------------------',
            '\r\n',
            JSON.stringify(
              {
                data: result.data,
                variables: result.operation?.variables,
              },
              null,
              2,
            ),
          );
        }
      }
    }
  }, [result]);
}

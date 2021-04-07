import { renderHook, act } from '@testing-library/react-hooks';
import useInfiniteQueryMany from 'hooks/useInfiniteQueryMany';
import HasuraConfig from 'support/HasuraConfig';
import useReactHasura from 'hooks/useReactHasura';
import { useState } from 'react';
jest.mock('../hooks/useUrqlQuery');

function useTestHook() {
  const [hello, setHello] = useState<String>('hi');

  return hello;
}

describe('useInfiniteQueryMany', () => {
  it('runs with no setup and returns an empty array', () => {
    const { result } = renderHook(() => {
      const rh = useReactHasura(HasuraConfig.groups);
      return rh.useInfiniteQueryMany({});
    });

    act(() => {});

    expect(result.current.results.length).toBe(0);
  });
  it('returns a populated data set on success', () => {});
  it('returns the current variables', () => {});
  it('returns a method to update variables (setObjectVariables))', () => {});
  it('returns an error if the primary keys are not detected', () => {});
});

import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { useTypedSelector } from './useTypedSelector';

export function useIsLoading() {
  const isLoading = useTypedSelector((state) => {
    return Object.values(state.api.queries).some((query) => {
      return query && query.status === QueryStatus.pending;
    });
  });

  return isLoading;
}

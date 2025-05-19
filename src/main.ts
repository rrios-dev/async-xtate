import {
  type AsyncErrorState,
  type AsyncInitialState,
  type AsyncLoadingState,
  type AsyncRefetchState,
  type AsyncSuccessState,
} from './types';
  
export function makeAsyncSuccessState<Data>(
  data: Data,
): AsyncSuccessState<Data> {
  return {
    status: 'success',
    data,
  };
}
  
export function makeAsyncErrorState<Err, Data>(
  err: Err,
  data?: Data,
): AsyncErrorState<Err, Data> {
  return {
    status: 'error',
    error: err,
    data,
  };
}
  
export function makeAsyncLoadingState<Data, Err>(
  data?: Data,
  error?: Err,
): AsyncLoadingState<Data, Err> {
  return {
    status: 'loading',
    data,
    error,
  };
}
  
export function makeRefetchState<Data, Err>(data?: Data, error?: Err): AsyncRefetchState<Data, Err> {
  return {
    status: 'refetch',
    data,
    error,
  };
}
  
export function makeInitialState<Data, Err>(data?: Data, error?: Err): AsyncInitialState<Data, Err> {
  return {
    status: 'initial',
    error,
    data,
  };
}
  
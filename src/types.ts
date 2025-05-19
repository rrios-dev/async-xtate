export interface AsyncSuccessState<Data> {
  status: 'success'
  data: Data
}

export interface AsyncErrorState<Err, Data> {
  status: 'error'
  error: Err
  data?: Data
}

export interface AsyncLoadingState<Data, Err> {
  status: 'loading'
  data?: Data
  error?: Err
}

export interface AsyncRefetchState<Data, Err> {
  status: 'refetch'
  data?: Data
  error?: Err
}

export interface AsyncInitialState<Data, Err> {
  status: 'initial'
  data?: Data
  error?: Err
}

export type AsyncState<Data, Err> =
  | AsyncSuccessState<Data>
  | AsyncErrorState<Err, Data>
  | AsyncLoadingState<Data, Err>
  | AsyncRefetchState<Data, Err>
  | AsyncInitialState<Data, Err>
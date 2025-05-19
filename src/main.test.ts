import { 
    makeAsyncSuccessState,
    makeAsyncErrorState,
    makeAsyncLoadingState,
    makeRefetchState,
    makeInitialState
} from '.'

describe('makers', () => {
  describe('makeAsyncSuccessState', () => {
    test('returns an object with status success', () => {
      const data = { test: true }
      const action = makeAsyncSuccessState(data)

      expect(action).toEqual({
        status: 'success',
        data
      })
    })
  })

  describe('makeAsyncErrorState', () => {
    test('returns an object with status error', () => {
      const error = { message: 'error message' }
      const action = makeAsyncErrorState(error)

      expect(action).toEqual({
        status: 'error',
        error
      })
    })

    test('returns an object with status error and data', () => {
      const error = { message: 'error message' }
      const data = { test: true }
      const action = makeAsyncErrorState(error, data)

      expect(action).toEqual({
        status: 'error',
        error,
        data
      })
    })
  })

  describe('makeAsyncLoadingState', () => {
    test('returns an object with status loading', () => {
      const action = makeAsyncLoadingState()

      expect(action).toEqual({
        status: 'loading'
      })
    })

    test('returns an object with status loading with data', () => {
      const data = { test: true }
      const action = makeAsyncLoadingState(data)

      expect(action).toEqual({
        status: 'loading',
        data
      })
    })

    test('returns an object with status loading, included data and error', () => {
      const error = { message: 'error message' }
      const data = { test: true }
      const action = makeAsyncLoadingState(data, error)

      expect(action).toEqual({
        status: 'loading',
        error,
        data
      })
    })
  })

  describe('makeRefetchState', () => {
    test('returns an object with status refetch', () => {
      const action = makeRefetchState()

      expect(action).toEqual({
        status: 'refetch'
      })
    })

    test('returns an object with status refetch with data', () => {
      const data = { test: true }
      const action = makeRefetchState(data)

      expect(action).toEqual({
        status: 'refetch',
        data
      })
    })

    test('returns an object with status refetch, included data and error', () => {
      const error = { message: 'error message' }
      const data = { test: true }
      const action = makeRefetchState(data, error)

      expect(action).toEqual({
        status: 'refetch',
        error,
        data
      })
    })
  })

  describe('makeInitialState', () => {
    test('returns an object with status initial', () => {
      const action = makeInitialState()

      expect(action).toEqual({
        status: 'initial'
      })
    })

    test('returns an object with status initial with data', () => {
      const data = { test: true }
      const action = makeInitialState(data)

      expect(action).toEqual({
        status: 'initial',
        data
      })
    })

    test('returns an object with status initial, included data and error', () => {
      const error = { message: 'error message' }
      const data = { test: true }
      const action = makeInitialState(data, error)

      expect(action).toEqual({
        status: 'initial',
        error,
        data
      })
    })
  })
})
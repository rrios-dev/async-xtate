# Async-Xtate Technical Documentation

## Overview

Async-Xtate is a TypeScript library designed to provide a type-safe way to handle asynchronous states in applications. It implements a discriminated union pattern to represent different states of async operations, making it easier to handle loading, success, error, and refetch states in a type-safe manner.

## Technical Architecture

### Core Concepts

The library is built around the concept of discriminated unions, where each state is represented by a specific interface with a `status` discriminator. This allows TypeScript to perform exhaustive type checking and provide accurate type inference.

### State Types

```typescript
// Success state with data
interface AsyncSuccessState<Data> {
  status: 'success'
  data: Data
}

// Error state with error and optional previous data
interface AsyncErrorState<Err, Data> {
  status: 'error'
  error: Err
  data?: Data
}

// Loading state with optional previous data and error
interface AsyncLoadingState<Data, Err> {
  status: 'loading'
  data?: Data
  error?: Err
}

// Refetch state with optional previous data and error
interface AsyncRefetchState<Data, Err> {
  status: 'refetch'
  data?: Data
  error?: Err
}

// Initial state with optional initial data and error
interface AsyncInitialState<Data, Err> {
  status: 'initial'
  data?: Data
  error?: Err
}
```

## Advanced Usage Examples

### 1. React Integration

```typescript
import { useState } from 'react';
import { 
  makeAsyncSuccessState,
  makeAsyncErrorState,
  makeAsyncLoadingState,
  type AsyncState
} from 'async-xtate';

type User = { id: number; name: string };
type UserError = string;

function UserProfile() {
  const [state, setState] = useState<AsyncState<User, UserError>>(
    makeAsyncLoadingState()
  );

  const fetchUser = async (id: number) => {
    try {
      setState(makeAsyncLoadingState());
      const response = await fetch(`/api/users/${id}`);
      const user = await response.json();
      setState(makeAsyncSuccessState(user));
    } catch (error) {
      setState(makeAsyncErrorState(error.message));
    }
  };

  return (
    <div>
      {state.status === 'loading' && <LoadingSpinner />}
      {state.status === 'error' && <ErrorMessage error={state.error} />}
      {state.status === 'success' && <UserDetails user={state.data} />}
    </div>
  );
}
```

### 2. State Machine Pattern

```typescript
import { 
  makeAsyncSuccessState,
  makeAsyncErrorState,
  makeAsyncLoadingState,
  makeRefetchState,
  type AsyncState
} from 'async-xtate';

class AsyncStateMachine<Data, Err> {
  private state: AsyncState<Data, Err>;

  constructor(initialData?: Data) {
    this.state = makeAsyncLoadingState(initialData);
  }

  setLoading() {
    this.state = makeAsyncLoadingState(this.state.data, this.state.error);
  }

  setSuccess(data: Data) {
    this.state = makeAsyncSuccessState(data);
  }

  setError(error: Err) {
    this.state = makeAsyncErrorState(error, this.state.data);
  }

  setRefetch() {
    this.state = makeRefetchState(this.state.data, this.state.error);
  }

  getState(): AsyncState<Data, Err> {
    return this.state;
  }
}
```

### 3. Type-Safe State Transitions

```typescript
import { 
  makeAsyncSuccessState,
  makeAsyncErrorState,
  makeAsyncLoadingState,
  type AsyncState
} from 'async-xtate';

type ApiResponse = { data: string };
type ApiError = { code: number; message: string };

function handleApiResponse(
  state: AsyncState<ApiResponse, ApiError>,
  response: Response
): AsyncState<ApiResponse, ApiError> {
  if (!response.ok) {
    return makeAsyncErrorState({
      code: response.status,
      message: response.statusText
    });
  }

  return makeAsyncSuccessState({
    data: response.data
  });
}
```

## Best Practices

1. **Type Safety**
   - Always define explicit types for your data and error states
   - Use type guards to narrow down state types
   - Leverage TypeScript's exhaustive checking

2. **State Management**
   - Keep previous data when transitioning to error or loading states
   - Use refetch state for background updates
   - Handle all possible states in your UI

3. **Error Handling**
   - Provide meaningful error types
   - Include previous data in error states when available
   - Use type-safe error handling patterns

## Performance Considerations

- The library is lightweight with zero dependencies
- State transitions are pure functions with no side effects
- Type information is removed at compile time
- No runtime overhead for type checking

## Testing

```typescript
import { 
  makeAsyncSuccessState,
  makeAsyncErrorState,
  makeAsyncLoadingState
} from 'async-xtate';

describe('Async State', () => {
  it('should create success state', () => {
    const state = makeAsyncSuccessState({ data: 'test' });
    expect(state.status).toBe('success');
    expect(state.data).toEqual({ data: 'test' });
  });

  it('should create error state with previous data', () => {
    const state = makeAsyncErrorState(
      'Error occurred',
      { data: 'previous' }
    );
    expect(state.status).toBe('error');
    expect(state.error).toBe('Error occurred');
    expect(state.data).toEqual({ data: 'previous' });
  });
});
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT © [Roberto Ríos](https://github.com/rrios-dev)

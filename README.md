# Async-Xtate

[![npm version](https://badge.fury.io/js/async-xtate.svg)](https://badge.fury.io/js/async-xtate)

A lightweight, type-safe library for managing async state in TypeScript applications.

## Features

- 🚀 Type-safe async state management
- 📦 Zero dependencies
- 🎯 Simple and intuitive API
- 🔄 Support for all async states (initial, loading, success, error, refetch)
- 🛠️ Built with TypeScript

## Installation

```bash
npm install async-xtate
# or
yarn add async-xtate
# or
pnpm add async-xtate
# or
bun add async-xtate
```

## Usage

```typescript
import { 
  makeAsyncSuccessState,
  makeAsyncErrorState,
  makeAsyncLoadingState,
  makeRefetchState,
  makeInitialState,
  type AsyncState
} from 'async-xtate';

// Define your data and error types
type UserData = { name: string; email: string };
type UserError = string;

// Create different states
const successState = makeAsyncSuccessState<UserData>({ 
  name: 'John Doe', 
  email: 'john@example.com' 
});

const errorState = makeAsyncErrorState<UserError, UserData>(
  'Failed to fetch user',
  { name: 'John Doe', email: 'john@example.com' }
);

const loadingState = makeAsyncLoadingState<UserData, UserError>();

const refetchState = makeRefetchState<UserData, UserError>(
  { name: 'John Doe', email: 'john@example.com' }
);

const initialState = makeInitialState<UserData, UserError>();
```

## API Reference

### State Types

- `AsyncSuccessState<Data>`: Represents a successful async operation
- `AsyncErrorState<Err, Data>`: Represents a failed async operation
- `AsyncLoadingState<Data, Err>`: Represents a loading state
- `AsyncRefetchState<Data, Err>`: Represents a refetching state
- `AsyncInitialState<Data, Err>`: Represents the initial state
- `AsyncState<Data, Err>`: Union type of all possible states

### Helper Functions

- `makeAsyncSuccessState<Data>(data: Data)`: Creates a success state
- `makeAsyncErrorState<Err, Data>(error: Err, data?: Data)`: Creates an error state
- `makeAsyncLoadingState<Data, Err>(data?: Data, error?: Err)`: Creates a loading state
- `makeRefetchState<Data, Err>(data?: Data, error?: Err)`: Creates a refetch state
- `makeInitialState<Data, Err>(data?: Data, error?: Err)`: Creates an initial state

## Type Safety

The library is fully type-safe, providing TypeScript with all the information it needs to ensure type correctness:

```typescript
const state: AsyncState<UserData, UserError> = makeAsyncSuccessState({
  name: 'John Doe',
  email: 'john@example.com'
});

// TypeScript knows the exact shape of the state
if (state.status === 'success') {
  console.log(state.data.name); // ✅ TypeScript knows this is safe
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Roberto Ríos](https://github.com/rrios-dev)

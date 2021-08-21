# grpc-node-oauth2

gRPC interceptor implementation for OAuth 2.0

## Installation

```sh
npm i grpc-node-oauth2
```

## Usage

```ts
import { createInterceptor } from 'grpc-node-oauth2';

const interceptor = createInterceptor({
  clientId: 'xxx',
  clientSecret: 'yyy',
  tokenUrl: 'https://example.com/token-endpoint',
  retryIntervalMs: 10e3
  retryMaxAttempts: 10,
});
```

## License

[MIT](LICENSE.md)

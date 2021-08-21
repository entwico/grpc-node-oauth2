import { InterceptingCall, Interceptor, Metadata, RequesterBuilder } from '@grpc/grpc-js';
import { ClientCredentialsConfig } from './client-credentials-config';
import { TokenWallet } from './wallet';

export interface CreateInterceptorConfig extends ClientCredentialsConfig { }

export function createInterceptor(config: CreateInterceptorConfig): Interceptor {
  const wallet = new TokenWallet(config);

  const requester = new RequesterBuilder()
    .withStart(async (metadata, listener, next) => {
      const token = await wallet.getToken();
      const newMetadata = metadata.clone();

      newMetadata.merge(Metadata.fromHttp2Headers({ 'Authorization': `Bearer ${token}` }));

      next(newMetadata, listener);
    })
    .build();

  return (options, nextCall) => new InterceptingCall(nextCall(options), requester);
}

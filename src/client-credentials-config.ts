export interface ClientCredentialsConfig {
  clientId: string;
  clientSecret: string;
  tokenUrl: string;
  retryIntervalMs: number;
  retryMaxAttempts: number;
}

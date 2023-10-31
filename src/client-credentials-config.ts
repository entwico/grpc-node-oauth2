export interface ClientCredentialsConfig {
  clientId: string;
  clientSecret: string;
  tokenUrl: string;
  retryIntervalMs: number;
  retryMaxAttempts: number;
  timeoutMs?: number;
  onFetch?: (token: string) => void;
  onFetchError?: (error: Error) => void;
  onStartFetching?: () => void;
  onSchedule?: (scheduledInMs: number) => void;
  onScheduleError?: (error: Error) => void;
}

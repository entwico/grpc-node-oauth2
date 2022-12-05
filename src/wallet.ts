import axios, { AxiosResponse } from 'axios';
import { stringify } from 'querystring';
import { ClientCredentialsConfig } from './client-credentials-config';
import jwtDecode, { JwtPayload } from 'jwt-decode';

export class TokenWallet {

  private axios = axios.create();
  private asyncToken?: Promise<string>;

  constructor(private config: ClientCredentialsConfig) {
    this.asyncToken = this.fetchToken();
  }

  getToken(): Promise<string> {
    return this.asyncToken || (this.asyncToken = this.fetchToken());
  }

  private fetchToken(retryAttempt = 0) {
    return new Promise<string>((resolve, reject) => {
      const body = {
        grant_type: 'client_credentials',
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
      };

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      this.config.onStartFetching?.();

      this.axios.post(this.config.tokenUrl, stringify(body), config)
        .then((response: AxiosResponse<{ access_token: string }>) => {
          const { data: { access_token } } = response;

          if (!access_token) {
            throw new Error('No access token in response');
          }

          this.config.onFetch?.(access_token);
          this.scheduleRefresh(access_token);
          resolve(access_token);
        })
        .catch((err) => {
          this.config.onFetchError?.(err);

          if (retryAttempt < this.config.retryMaxAttempts) {
            setTimeout(() => this.fetchToken(++retryAttempt), this.config.retryIntervalMs);
          } else {
            this.asyncToken = undefined;
            reject(err);
          }
        });
    });
  }

  private async scheduleRefresh(token: string) {
    let scheduledInMs = 1 * 60 * 1e3;

    try {
      const { exp } = jwtDecode<JwtPayload>(token);

      if (exp && !Number.isNaN(exp) && exp > Date.now()) {
        scheduledInMs = exp * 1e3 * .95 - Date.now();
      }
    } catch(ex) {
      this.config.onScheduleError?.(ex as Error);
    }

    this.config.onSchedule?.(scheduledInMs);

    setTimeout(() => this.asyncToken = this.fetchToken(), scheduledInMs);
  }

}
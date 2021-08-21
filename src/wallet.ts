import axios, { AxiosResponse } from 'axios';
import { stringify } from 'querystring';
import { ClientCredentialsConfig } from './client-credentials-config';

export class TokenWallet {

  private axios = axios.create();

  private asyncToken: Promise<string>;

  constructor(private config: ClientCredentialsConfig) { }

  getToken(): Promise<string> {
    return this.asyncToken || (this.asyncToken = this.call());
  }

  private call(retryAttempt = 0) {
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

      this.axios.post(this.config.tokenUrl, stringify(body), config)
        .catch((err) => {
          if (retryAttempt < this.config.retryMaxAttempts) {
            setTimeout(() => this.call(++retryAttempt), this.config.retryIntervalMs);
          } else {
            reject(err);
          }
        })
        .then((res: AxiosResponse<{ access_token: string }>) => {
          setTimeout(() => this.asyncToken = null, 3 * 60 * 1e3);

          resolve(res.data.access_token);
        });
    });
  }

}

import fetch from 'node-fetch';
import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions,
  Client, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';
import { Injectable } from '@nestjs/common';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

@Injectable()
export class ClientService {
  // / Create apiRoot from the imported ClientBuilder and include your Project key
  public apiRoot: ByProjectKeyRequestBuilder;
  constructor() {
    this.createClient();
  }

  async createClient(): Promise<void> {
    const projectKey = `${process.env.CTP_PROJECT_KEY}`;
    const scopes = [`${process.env.CTP_SCOPES}`];

    // Configure authMiddlewareOptions
    const authMiddlewareOptions: AuthMiddlewareOptions = {
      host: `https://auth.${process.env.CTP_REGION}.commercetools.com`,
      projectKey: projectKey,
      credentials: {
        clientId: `${process.env.CTP_CLIENT_ID}`,
        clientSecret: `${process.env.CTP_CLIENT_SECRET}`,
      },
      scopes: scopes,
      fetch,
    };

    // Configure httpMiddlewareOptions
    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: `https://api.${process.env.CTP_REGION}.commercetools.com`,
      fetch,
    };

    const ctpClient: Client = new ClientBuilder()
      .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
      .withClientCredentialsFlow(authMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware() // Include middleware for logging
      .build();

    this.apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey,
    });
  }
}

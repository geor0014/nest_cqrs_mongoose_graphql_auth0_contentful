import { Injectable } from '@nestjs/common';

import { createClient, Environment } from 'contentful-management';
// CONFIG
require('dotenv').config();

@Injectable()
export class ContentfulService {
  public environment: Environment;
  constructor() {
    this.createContentfulClient();
  }
  async createContentfulClient(): Promise<void> {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CMA_ACCESS_TOKEN,
    });
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    this.environment = await space.getEnvironment(
      process.env.CONTENTFUL_ENVIRONMENT,
    );
  }
}

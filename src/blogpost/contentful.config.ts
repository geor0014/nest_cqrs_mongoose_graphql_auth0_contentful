import { Injectable } from '@nestjs/common';

import { createClient, Environment } from 'contentful-management';
// CONFIG
require('dotenv').config();

// export async function createContentfulClient() {
//   try {
//     const client = contentful
//       .createClient({
//         space: process.env.CONTENTFUL_SPACE_ID,
//         accessToken: process.env.CMA_ACCESS_TOKEN,
//       })
//       .getSpace(process.env.CONTENTFUL_SPACE_ID)
//       .then((space) => {
//         return space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT);
//       });
//     return client;
//   } catch (error) {
//     console.error('Error fetching blog posts:', error);
//     throw new Error('Failed to fetch blog posts');
//   }
// }

// convert to Injectable service
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

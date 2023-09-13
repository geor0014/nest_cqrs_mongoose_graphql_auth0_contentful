import { createClient } from 'contentful';
// CONFIG
require('dotenv').config();

export async function createContentfulClient() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  return client;
}

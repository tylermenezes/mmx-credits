import { config } from 'dotenv';
config();

export default {
  airtable: {
    base: process.env.AIRTABLE_BASE!,
    tables: {
      credits: process.env.AIRTABLE_TABLE_CREDITS!,
    },
    apiKey: process.env.AIRTABLE_API_KEY!,
  }
}

import { config } from 'dotenv';
config();

export default {
  airtable: {
    base: process.env.AIRTABLE_BASE!,
    tables: {
      credits: process.env.AIRTABLE_TABLE_CREDITS!,
      mappings: process.env.AIRTABLE_TABLE_MAPPINGS!,
      collaborators: process.env.AIRTABLE_TABLE_COLLABORATORS!,
    },
    views: {
      collaborators: {
        missing: process.env.AIRTABLE_TABLE_COLLABORATORS_VIEW_MISSING!,
      },
    },
    apiKey: process.env.AIRTABLE_API_KEY!,
  }
}

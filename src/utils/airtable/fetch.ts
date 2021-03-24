import Airtable from 'airtable';
import config from '../../config';
import { fetchPages } from './helpers';
import { Record, CreditNameOption } from './Record';
import { Person } from './Person';
import { Credit } from './Credit';

Airtable.configure({
  apiKey: config.airtable.apiKey,
  endpointUrl: undefined,
  apiVersion: undefined,
  noRetryIfRateLimited: false
});

const base = Airtable.base(config.airtable.base);
const table = base.table(config.airtable.tables.credits);

function getPreferredName(
  option: CreditNameOption | undefined,
  discord: string | undefined,
  name: string | undefined
): { discord?: string | undefined, name?: string | undefined } {
  if (!option || option === 'Only my discord name' || !name) { discord };
  if (option === 'Only my name as typed in the "public credit name" section below') { name };
  return { discord, name };
}

const TITLE_SUBTEAMS = ['PM', 'Manager'];
function getCredit(str: string): Credit {
  const [team, subteam] = str.split(':', 2);
  if (subteam && subteam.trim().length > 0) {
    return {
      team: team.trim(),
      subteam: subteam.trim(),
    };
  }

  for (const titleSubteam of TITLE_SUBTEAMS) {
    if (team.includes(` ${titleSubteam}`)) {
      return {
        team: team.split(` ${titleSubteam}`, 1)[0]!,
        subteam: titleSubteam,
      };
    }
  }

  return { team };
}

export async function fetchAllPeople(): Promise<Person[]> {
  const records = await fetchPages(table.select());
  return records
    .map((r): Record => <Record><unknown>r.fields)
    .map((r): Person => ({
      ...getPreferredName(
        r['Credit Name Options']? r['Credit Name Options'][0] : undefined,
        r['Discord ID'] ? r['Discord ID'][0] : undefined,
        r['Public Credit Name']
      ),
      credits: r['Credit Type']?.map(getCredit) || [],
      cadParts: [
        ...r['CAD Team Parts Worked On']?.split("\n").filter(Boolean) || [],
        ...r['PBS Parts Worked On']?.split("\n").filter(Boolean) || [],
      ],
      parts: r['MMX Contributor']?.split("\n").filter(Boolean) || [],
      promotionLink: r['Self-Promotion Link'],
      startDate: r['Activity Start Date (Approx)'],
      endDate: r['Activity End Date (Approx)'],
    }))
    .filter((p) => p.credits.length > 0 && (p.name || p.discord))
    .sort((a, b) => (a.name || a.discord || '') > (b.name || b.discord || '') ? 1 : -1);
}

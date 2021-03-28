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
  if (!option
      || option === 'Only my discord name as typed in the "public credit discord name" section below'
      || !name) return { discord };
  if (option === 'Only my other name as typed in the "public credit other name" section below') return { name };
  return { discord, name };
}

const TITLE_SUBTEAMS = ['Team'];
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
      const [preTeam, postTeam] = team.split(` ${titleSubteam}`, 1);
      return {
        team: preTeam + ` Team`,
        subteam: postTeam,
      };
    }
  }

  return { team };
}

export async function fetchAllPeople(): Promise<Person[]> {
  const records = await fetchPages(table.select());

  const seenNames: string[] = [];

  return records
    .map((r): Record => <Record><unknown>r.fields)
    .filter((p) =>
      p['Discord ID'] && p['Discord ID'][0] && (p['Public Credit - Discord Name'] || p['Public Credit - Other Name'])
    )
    .reverse()
    .filter((p) => {
      if (seenNames.includes(p['Discord ID']![0]!)) return false;
      seenNames.push(p['Discord ID']![0]!);
      return true;
    })
    .reverse()
    .filter((p) => p['Credit Name Options'] && p['Credit Name Options'][0] !== 'I do not wish to be credited publicly')
    .map((r): Person => ({
      id: r['Discord ID']![0] || '',
      ...getPreferredName(
        r['Credit Name Options'],
        r['Public Credit - Discord Name'],
        r['Public Credit - Other Name']
      ),
      credits: r['Credit Type']?.map(getCredit) || [],
      cadParts: [
        ...r['CAD Team Parts Worked On']?.split("\n").map((e) => e.trim()).filter(Boolean) || [],
        ...r['PBS Parts Worked On']?.split("\n").map((e) => e.trim()).filter(Boolean) || [],
      ],
      parts: r['MMX Contributor']?.split("\n").map((e) => e.trim()).filter(Boolean) || [],
      promotionLink: r['Self-Promotion Link'],
      startDate: r['Activity Start Date (Approx)'],
      endDate: r['Activity End Date (Approx)'],
    }))
    .sort((a, b) => (a.name || a.discord || '').toUpperCase() > (b.name || b.discord || '').toUpperCase() ? 1 : -1);
}

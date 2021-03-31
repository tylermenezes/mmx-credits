import { Person } from './Person';
import { Team } from './Team';

const TEAM_SORT_OVERRIDES = [
  'CAD Team',
  'Engineering Team',
  'Project Lead',
  'MMX Contributor',
  'Idea Vault Organizer Team',
];

export default function peopleToTeams(people: Person[]): Team[] {
  const teams: Team[] = [];
  people
  .map((person) => person.credits.map((credit) => ({ person, credit })))
  .reduce((accum, pc) => [...accum, ...pc], [])
  .forEach(({ person, credit }) => {
    let myTeam = teams.filter((t) => t.name === credit.team)[0] || undefined;
    if (!myTeam) {
      myTeam = { name: credit.team, people: [] };
      teams.push(myTeam);
    }

    if (myTeam.people!.filter((p) => p.id === person.id).length === 0) {
      myTeam.people!.push(person);
    }

    if (!myTeam.subteams) myTeam.subteams = [];

    let mySubteam = myTeam.subteams.filter((st) => st.name === credit.subteam)[0] || undefined;
    if (!mySubteam) {
      mySubteam = { name: credit.subteam!, people: [] };
      myTeam.subteams.push(mySubteam);
    }

    mySubteam.people!.push(person);
  });

  return teams.sort((a, b) => {
    if (!TEAM_SORT_OVERRIDES.includes(a.name) && !TEAM_SORT_OVERRIDES.includes(b.name)) return 0;
    if (TEAM_SORT_OVERRIDES.includes(a.name) && !TEAM_SORT_OVERRIDES.includes(b.name)) return -1;
    if (TEAM_SORT_OVERRIDES.includes(b.name) && !TEAM_SORT_OVERRIDES.includes(a.name)) return 1;
    return TEAM_SORT_OVERRIDES.indexOf(a.name) < TEAM_SORT_OVERRIDES.indexOf(b.name) ? -1 : 1;
  });
}

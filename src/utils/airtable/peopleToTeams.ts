import { Person } from './Person';
import { Team } from './Team';

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

    if (myTeam.people!.filter((p) => p.discord === person.discord).length === 0) {
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

  return teams;
}

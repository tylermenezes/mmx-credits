import { ReactElement } from 'react';
import { GetServerSidePropsResult } from 'next';
import { Box, Text } from '@chakra-ui/react';
import { getDisplayName } from '../Components/Person';
import Page from '../Components/Page';

import { airtable } from '../utils';
import peopleToTeams from '../utils/airtable/peopleToTeams';
import { CustomAppProps } from './_app';

interface IndexProps extends CustomAppProps {
  people: airtable.Person[],
}

function maybePluralize(str: string): string {
  if (str.slice(-4) === 'Team') return str;
  if (str.slice(-1) === 's') return str;
  return `${str}s`;
}

export default function Copy({ people }: IndexProps): ReactElement {
  return (
    <Page title="Copyable Credits">
      {peopleToTeams(people).map((team) => (
        <>
          <Text fontWeight="bold" color="#000" fontSize="xl" textDecor="underline">
            {maybePluralize(team.name)}
          </Text>
          {team.people.map((person) => (
            <>
              <Text id={person.id} color="#000">{getDisplayName(person, true)}</Text>
            </>
          ))}
          <br />
        </>
      ))}
    </Page>
  );
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<IndexProps>> {
  return {
    props: {
      people: JSON.parse(JSON.stringify(await airtable.fetchAllPeople())), // workaround for nextjs `undefined` behavior
    },
  }
}

import { useReducer, ReactElement } from 'react';
import { GetStaticPropsResult } from 'next';
import { Box, Text, Button } from '@chakra-ui/react';
import useSwr from 'swr';
import fetch from 'node-fetch';
import Page from '../Components/Page';
import People from '../Components/People';
import { airtable } from '../utils';
import peopleToTeams from '../utils/airtable/peopleToTeams';
import { CustomAppProps } from './_app';

interface IndexProps extends CustomAppProps {
  people: airtable.Person[],
}

export default function Index({ people }: IndexProps): ReactElement {
  const [ groupTeams, toggleGroupTeams ] = useReducer((s) => !s, false);
  const { data, error } = useSwr('/api/credits', (f) => fetch(f).then((r) => r.json()) );

  const currentPeople = data ? (data as unknown) as airtable.Person[] : people;

  return (
    <Page title="Credits">
      <Box mb={8}>
        <Button onClick={toggleGroupTeams} mr={4}>{groupTeams ? 'Show by Person' : 'Show by Team'}</Button>
        <Button as="a" href="/graph" target="_blank" rel="noopener">Thousand Arm Octopus Map</Button>
      </Box>

      {groupTeams ? (
        peopleToTeams(currentPeople).map((team) => (
          <Box key={team.name} mb={8}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>{team.name}</Text>
            <People people={team.people} />
          </Box>
        ))
      ) : <People withCredits people={currentPeople} />}
    </Page>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<IndexProps>> {
  return {
    props: {
      people: JSON.parse(JSON.stringify(await airtable.fetchAllPeople())), // workaround for nextjs `undefined` behavior
    },
    revalidate: 60,
  }
}

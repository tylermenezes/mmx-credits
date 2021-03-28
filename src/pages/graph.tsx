import { ReactElement } from 'react';
import { GetServerSidePropsResult } from 'next';
import { Box, Text, useTheme } from '@chakra-ui/react';
import Graph from 'react-graph-vis';
import { getDisplayName } from '../Components/Person';
import Page from '../Components/Page';

import { airtable } from '../utils';
import peopleToTeams from '../utils/airtable/peopleToTeams';
import { CustomAppProps } from './_app';

interface IndexProps extends CustomAppProps {
  people: airtable.Person[],
}

export default function GraphPage({ people }: IndexProps): ReactElement {
  const teams = peopleToTeams(people);
  const { colors } = useTheme();

  const graph = {
    nodes: [
      ...teams.map((t) => ({ id: t.name, label: t.name, color: colors.blue[300], mass: 4 })),
      ...people.map((p) => ({ id: p.id, label: p.name || p.discord, color: colors.gray[100], shape: 'box', mass: 2 })),
    ],
    edges: people
      .map((person) => person.credits.map((credit) => ({ credit, person })))
      .reduce((accum, e) => [...accum, ...e])
      .map(({ person, credit }) => ({ from: person.id, to: credit.team, arrows: { to: false, from: false } })),
  };

  return (
    <Page title="Contribution Graph">
      <Box width="100%" height="100%" position="fixed" top={0} bottom={0} left={0} right={0}>
        <Graph
          graph={graph}
          options={{ edges: { color: colors.black } }}
        />
      </Box>
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

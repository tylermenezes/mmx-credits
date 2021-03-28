import { ReactElement } from 'react';
import { GetServerSidePropsResult } from 'next';
import { Box, Text, useTheme } from '@chakra-ui/react';
import Graph from 'react-graph-vis';
import averageColor from '@bencevans/color-array-average';
import { FIXED_COLORS } from '../Components/Credit';
import Page from '../Components/Page';

import { airtable } from '../utils';
import peopleToTeams from '../utils/airtable/peopleToTeams';
import { CustomAppProps } from './_app';

interface IndexProps extends CustomAppProps {
  people: airtable.Person[],
}

function averageCreditColors(credits: airtable.Credit[], colors: Record<string, string>): string | undefined {
  const teams: string[] = [];
  credits.forEach((c) => { if (!teams.includes(c.team)) teams.push(c.team) });

  const teamColors = teams.filter((t) => t in colors).map((t) => colors[t]).filter(Boolean);
  if (teamColors.length === 0) return undefined;
  return averageColor(teamColors);
}

export default function GraphPage({ people }: IndexProps): ReactElement {
  const teams = peopleToTeams(people);
  const { colors, fonts } = useTheme();
  const renderColors = (lightness: number): Record<string, string> => Object.keys(FIXED_COLORS)
    .reduce((accum, k) => ({ ...accum, [k]: colors[FIXED_COLORS[k as keyof typeof FIXED_COLORS]][lightness] }), {});

  const graph = {
    nodes: [
      ...people.map((p) => ({
        id: p.id,
        label: p.name || p.discord,
        color: {
          border: averageCreditColors(p.credits, renderColors(300)) || colors.gray[200],
          background: '#fff',
          hover: {
            background: averageCreditColors(p.credits, renderColors(50)) || colors.gray[50],
            border: averageCreditColors(p.credits, renderColors(300)) || colors.gray[200],
          },
        },
        font: {
          face: fonts.body,
        },
        borderWidth: 4,
        shape: 'box',
        mass: 2
      })),

      ...teams
      .sort((a, b) => b.people.length - a.people.length) // We'll fix the first team in the center, so make it largest
      .map((t, i) => ({
        id: t.name,
        label: t.name.replace(/Team ?$/, ''),
        shape: 'ellipse',
        color: renderColors(300)[t.name] || colors.gray[200],
        mass: 6,
        font: {
          color: renderColors(900)[t.name] || colors.gray[900],
          size: 18,
          face: fonts.body,
        },
        shadow: true,
        fixed: i === 0,
      })),
    ],
    edges: people
      .map((person) => person.credits.map((credit) => ({ credit, person })))
      .reduce((accum, e) => [...accum, ...e])
      .map(({ person, credit }) => ({ from: person.id, to: credit.team, arrows: { to: false, from: false } })),
  };

  return (
    <Page title="Contribution Map">
      <Box width="100%" height="100%" position="fixed" top={0} bottom={0} left={0} right={0}>
        <Graph
          graph={graph}
          options={{
            edges: { color: colors.black },
            interaction: {
              hover: true,
              hoverConnectedEdges: true,
              selectable: false,
            },
            layout: {
              randomSeed: 'wintergatan',
            },
          }}
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

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

export default function Copy({ people }: IndexProps): ReactElement {
  return (
    <Page title="Copyable Credits">
      <Text fontSize="4xl" fontWeight="bold" mb={8}>Copy By Team</Text>
      {peopleToTeams(people).map((team) => (
        <>
          <Text fontWeight="bold">{team.name.toUpperCase()}<br /><br /></Text>
          {team.people.map((person) => (
            <>
              <Text>► {getDisplayName(person)}</Text>
              {person.promotionLink && <Text>{person.promotionLink}</Text>}
              <br />
            </>
          ))}
          <br />
        </>
      ))}

      <Text fontSize="4xl" fontWeight="bold" mb={8}>Copy Everyone</Text>
      {people.map((person) => (
        <>
          <Text>► {getDisplayName(person)}</Text>
          {person.promotionLink && <Text>{person.promotionLink}</Text>}
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

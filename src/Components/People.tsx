import { ReactElement } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Grid } from '@chakra-ui/react';
import Person from './Person';
import { airtable } from '../utils'

interface PeopleProps extends ChakraProps {
  people: airtable.Person[],
  withCredits?: boolean | undefined,
}

export default function People({ people, withCredits, ...props }: PeopleProps): ReactElement {
  return (
    <Grid
      templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
      gap={4}
      justifyItems="center"
      {...props}
    >
      {people.map((p) => <Person withCredits={withCredits} person={p} key={p.id} />)}
    </Grid>
  )
}

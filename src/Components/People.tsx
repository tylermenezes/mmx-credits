import { ReactElement } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Grid } from '@chakra-ui/react';
import Person, { PersonProps } from './Person';
import { airtable } from '../utils'

export interface PeopleProps extends Omit<PersonProps, 'person'> {
  people: airtable.Person[],
}

export default function People({ people, ...props }: PeopleProps): ReactElement {
  return (
    <>
      {people.map((p) => <Person
        person={p}
        key={p.id}
        mb={4}
        {...props}
      />)}
    </>
  )
}

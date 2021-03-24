import { ReactElement } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Box, Text } from '@chakra-ui/react';
import Credit from './Credit';
import { airtable } from '../utils'

interface PersonProps extends ChakraProps {
  person: airtable.Person,
  withCredits?: boolean | undefined,
}

export function getDisplayName(person: airtable.Person): string {
  if (person.name && person.discord) return `${person.name} (${person.discord})`;
  return person.name || person.discord || '';
}

export default function Person({ person, withCredits, ...props }: PersonProps): ReactElement {
  return (
    <Box
      textAlign="center"
      {...(person.promotionLink ? { as: 'a', href: person.promotionLink, target: '_blank', rel: 'noopener' } : {})}
      {...props}
    >
      <Text fontWeight="bold" fontSize="md" textDecoration={person.promotionLink ? 'underline' : undefined}>
        {getDisplayName(person)}
      </Text>
      {withCredits && person.credits.map((c) => <Credit credit={c} />)}
    </Box>
  )
}

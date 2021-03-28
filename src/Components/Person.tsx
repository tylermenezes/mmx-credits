import { ReactElement } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Box, Text, Image } from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';
import Credit from './Credit';
import LinkPreview from './LinkPreview';
import { airtable } from '../utils'

interface PersonProps extends ChakraProps {
  person: airtable.Person,
  withCredits?: boolean | undefined,
}

export function getDisplayName(person: airtable.Person): ReactElement {
  const discordLogo = <Image src="/discord.svg" d="inline-block" h="1.2em" />;
  if (person.name && person.discord) return <>{person.name}/{discordLogo}{person.discord}</>;
  if (person.discord) return <>{discordLogo}{person.discord}</>;
  return <>{person.name || ''}</>;
}


export default function Person({ person, withCredits, ...props }: PersonProps): ReactElement {
  return (
    <Box d="block" {...props}>
      <Text fontWeight="bold" fontSize="md">
        {getDisplayName(person)} <LinkPreview href={person.promotionLink} />
      </Text>
      <Box fontSize="sm" color="gray.500">
        {withCredits &&
          person.credits
            .map<React.ReactNode>((c) => <Credit key={`${c.team}-${c.subteam}`} credit={c} />)
            .reduce((prev, cur) => [prev, `, `, cur])
        }
      </Box>
    </Box>
  )
}

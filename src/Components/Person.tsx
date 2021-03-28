import { ReactElement } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Box, Text, Image } from '@chakra-ui/react';
import Credit from './Credit';
import { airtable } from '../utils'

interface PersonProps extends ChakraProps {
  person: airtable.Person,
  withCredits?: boolean | undefined,
}

export function getDisplayName(person: airtable.Person): ReactElement {
  const discordLogo = <Image src="/discord.svg" d="inline-block" h="1.2em" />;
  if (person.name && person.discord) return <>{person.name} ({discordLogo}{person.discord})</>;
  if (person.discord) return <>{discordLogo}{person.discord}</>;
  return <>{person.name || ''}</>;
}

function fixHyperlink(link: string): string {
  const allowedPrefixes = ['http://', 'https://', 'mailto:'];
  if (allowedPrefixes.reduce((accum: boolean, p) => accum || link.substr(0, p.length) === p, false)) return link;
  return `http://${link}`;
}

export default function Person({ person, withCredits, ...props }: PersonProps): ReactElement {
  return (
    <Box
      d="block"
      {...(person.promotionLink
          ? { as: 'a', href: fixHyperlink(person.promotionLink), target: '_blank', rel: 'noopener' }
          : {})}
      {...props}
    >
      <Text fontWeight="bold" fontSize="md" textDecoration={person.promotionLink ? 'underline' : undefined}>
        {getDisplayName(person)}
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

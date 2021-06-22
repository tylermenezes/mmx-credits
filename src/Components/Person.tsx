import { ReactElement } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Box, Grid, Text, Image } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import Credit from './Credit';
import LinkPreview from './LinkPreview';
import { airtable } from '../utils'

export interface PersonProps extends ChakraProps {
  person: airtable.Person,
  milkyWay?: boolean | undefined,
  withCredits?: boolean | undefined,
  withStar?: boolean | undefined,
}

export function getDisplayName(person: airtable.Person, textOnly: boolean = false): ReactElement {
  const discordLogo = textOnly ? <></> : <Image src="/discord.svg" d="inline-block" h="1.2em" />;
  if (person.name && person.discord) return <>{person.name}/{discordLogo}{person.discord}</>;
  if (person.discord) return <>{discordLogo}{person.discord}</>;
  return <>{person.name || ''}</>;
}


export default function Person({ person, milkyWay, withCredits, withStar, ...props }: PersonProps): ReactElement {
  return (
    <Grid templateColumns="100%" gap={4} alignItems="top">
      <Box d="block" color={milkyWay ? 'milkyWayText' : 'gray.500'} {...props}>
        <Text fontWeight="bold" fontSize="md">
          <Text as="span" color={milkyWay ? 'white' : 'black'}>
            {milkyWay && <StarIcon mb="0.5em" pt="0.2em" mr={1} />}
            {getDisplayName(person)}{' '}
          </Text>
          <LinkPreview href={person.promotionLink} />
        </Text>
        {withCredits && (
          <Box fontSize="sm">
            <Text as="span" fontWeight="bold">Teams &mdash; </Text>
            {person.credits
                .map<React.ReactNode>((c) => <Credit key={`${c.team}-${c.subteam}`} credit={c} />)
                .reduce((prev, cur) => [prev, `, `, cur])}
          </Box>
        )}
        {person.cadParts.length > 0 && (
          <Box fontSize="sm">
            <Text as="span" fontWeight="bold">CAD Models &mdash; </Text>
            {person.cadParts.join(', ')}
          </Box>
        )}
        {person.parts.length > 0 && (
          <Box fontSize="sm">
            <Text as="span" fontWeight="bold">MMX Contributions &mdash; </Text>
            {person.parts.join(', ')}
          </Box>
        )}
      </Box>
    </Grid>
  )
}

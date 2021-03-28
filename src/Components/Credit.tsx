import { ReactElement } from 'react';
import { Text } from '@chakra-ui/react';
import { ChakraProps } from '@chakra-ui/system';
import rng from 'random-seed';
import { airtable } from '../utils'

interface CreditProps extends ChakraProps {
  credit: airtable.Credit
}

export function getDisplayCredit(credit: airtable.Credit): string {
  if (credit.subteam) return `${credit.team}: ${credit.subteam}`;
  return credit.team || '';
}

export const UNSET_COLORS = ['cyan', 'blue', 'orange', 'teal', 'green', 'black', 'purple'];
export const FIXED_COLORS = {
  'CAD Team': 'cyan',
  'Idea Vault Organizer Team': 'blue',
  'Engineering Team': 'orange',
  'MMX Contributor': 'teal',
  'Discord Moderator Team': 'green',
  'Project Lead': 'black',
  'Subtitles Team': 'purple',
}

export default function Credit({ credit, ...props }: CreditProps): ReactElement {
  const color = credit.team in FIXED_COLORS
    ? FIXED_COLORS[credit.team as keyof typeof FIXED_COLORS]
    : UNSET_COLORS[rng.create(credit.team).intBetween(0, UNSET_COLORS.length - 1)];

  return (
    <Text
      as="span"
      color={`${color}.700`}
    >
      {getDisplayCredit(credit)}
    </Text>
  );
}

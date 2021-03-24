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

const COLORS = ['red', 'green', 'blue', 'pink', 'yellow', 'cyan'];

export default function Credit({ credit, ...props }: CreditProps): ReactElement {
  const color = COLORS[rng.create(credit.team).intBetween(0, COLORS.length - 1)];

  return (
    <Text
      as="span"
      d="inline-block"
      bg={`${color}.100`}
      color={`${color}.700`}
      fontSize="sm"
      p={1}
      mr={1}
      mb={1}
      rounded="sm"
    >
      {getDisplayCredit(credit)}
    </Text>
  );
}
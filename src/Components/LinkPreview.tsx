import { ReactElement } from 'react';
import { Text } from '@chakra-ui/react';
import { ChakraProps } from '@chakra-ui/system';
import { LinkIcon, EmailIcon } from '@chakra-ui/icons';

interface LinkPreviewProps extends ChakraProps {
  href?: string | undefined
}

function fixHref(link: string | undefined): string | undefined {
  if (!link) return undefined;
  const allowedPrefixes = ['http://', 'https://', 'mailto:'];
  if (allowedPrefixes.reduce((accum: boolean, p) => accum || link.indexOf(p) === 0, false)) return link;
  return `http://${link}`;
}

function cleanupHostname({ hostname }: URL): string {
  const domainParts = hostname.split(/\./g);
  if (domainParts[0] === 'www') return domainParts.slice(1).join('.');
  return hostname;
}

function makeDisplayUrl(url: URL): string {
  const cleanedHost = cleanupHostname(url);
  const pathParts = url.pathname.split('/').filter(Boolean);

  let displayPath: string | undefined;
  if (pathParts[0]) {
    if (cleanedHost === 'instagram.com') displayPath = pathParts[0];
    else if ((cleanedHost === 'facebook.com' || cleanedHost === 'fb.com')) displayPath = pathParts[0];
    else if (cleanedHost === 'linkedin.com' && pathParts[1]) displayPath = pathParts.slice(0,2).join('/');
    else displayPath = pathParts.join('/');
  }

  return displayPath ? `${cleanedHost}/${displayPath}` : cleanedHost;
}

export default function LinkPreview({ href, ...props }: LinkPreviewProps): ReactElement {
  const fixedLink = fixHref(href);
  if (!fixedLink) return <></>;

  const url = new URL(fixedLink);

  const display = url.protocol === 'mailto:'
    ? <><EmailIcon /> {url.pathname}</>
    : <><LinkIcon /> {makeDisplayUrl(url)}</>;

  return <Text
    as="a"
    fontSize="sm"
    href={fixedLink}
    target="_blank"
    rel="noopener"
    d="inline-block"
    textDecoration="underline"
    {...props}
  >
    {display}
  </Text>;
}

import React from 'react';

import { Box, Heading, Paragraph } from 'grommet';

import { Halt } from 'grommet-icons';

export const NotFound = () => {
  return (
    <Box align="center" justify="center" pad={{ left: 'large', right: 'large', top: 'medium' }}>
      <Box align="center">
        <Halt size="xlarge" color={{ light: 'brand', dark: 'accent-1' }} />
        <Heading textAlign="center" level="2">
          Uh oh!
        </Heading>
        <Paragraph textAlign="center">
          The page you requested does not exist or has been removed.
        </Paragraph>
      </Box>
    </Box>
  );
};

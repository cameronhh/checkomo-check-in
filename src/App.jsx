import React from 'react';
import { Button, Box, Grommet, Heading } from 'grommet';

import { Map } from 'grommet-icons';

import { siteName, siteTheme } from './site-config';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { CheckIn } from './pages/CheckIn';
import { NotFound } from './pages/NotFound';

const AppBar = (props) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="center"
    background="brand"
    pad={{ vertical: 'medium' }}
    margin={{ bottom: 'medium' }}
    elevation="small"
    {...props}
  />
);

export const App = () => {
  return (
    <Grommet theme={siteTheme} themeMode="light" full>
      <Box fill background="light-2">
        <AppBar>
          <Button
            plain
            href={process.env.REACT_APP_MAIN_SITE}
            icon={<Map color="white" />}
            label={
              <Heading level="3" color="white" margin="none">
                {siteName}
              </Heading>
            }
          />
        </AppBar>
        <BrowserRouter>
          <Switch>
            <Route exact path="/:venueId/:venueCode" component={CheckIn} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Box>
    </Grommet>
  );
};

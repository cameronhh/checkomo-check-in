import React from 'react';
import {
  Box,
  Heading,
  Grommet,
} from "grommet";

import { siteName, siteTheme } from './site-config'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { CheckIn } from './pages/CheckIn'
import { NotFound } from './pages/NotFound'

const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='center'
    background='brand'
    pad={{ vertical: 'medium' }}
    margin={{ bottom: 'medium' }}
    {...props}
  />
);

export const App = () => {

  return (
    <Grommet theme={siteTheme} themeMode="light" full>
      <AppBar>
        <Heading level='3' margin='none'>{siteName}</Heading>
      </AppBar>
      <BrowserRouter>
        <Switch>
          <Route exact path="/:venueId/:venueCode" component={CheckIn} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Grommet>
  );
}

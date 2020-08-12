import { deepMerge } from 'grommet/utils';
import { grommet } from "grommet"

export const siteName = 'Checkomo';

export const siteTheme = deepMerge(grommet, {
  formField: {
    error: {
      size: 'xsmall',
    },
    help: {
      size: 'xsmall',
    },
    info: {
      size: 'xsmall',
    },
    label: {
      size: 'small',
    },
  },
});

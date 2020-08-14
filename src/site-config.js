import { deepMerge } from 'grommet/utils';
import { grommet } from "grommet"

export const siteName = 'Checkomo';

export const siteTheme = deepMerge(grommet, {
  global: {
    colors: {
      brand: '#3D138D',
      "neutral-2": '#7D4CDB',
    },
    // colors: {
    //   brand: '#7D4CDB',
    //   "neutral-2": '#3D138D',
    // },
  },
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

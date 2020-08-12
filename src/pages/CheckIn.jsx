import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
} from "grommet";

import { useQuery } from 'react-query'
import {
  getVenueDetail,
  getVenueCodeDetail,
} from '../api'

import { CheckInForm } from '../components/CheckInForm';
import { Spinner } from '../components/Spinner';

export const CheckIn = (props) => {
  const [urlParams,] = useState({
    id: props.match.params.venueId,
    code: props.match.params.venueCode,
  });

  const venueDetailQuery = useQuery([urlParams.id], getVenueDetail);
  const venueCodeDetailQuery = useQuery([urlParams.id, urlParams.code], getVenueCodeDetail);

  const [checkedIn, setCheckedIn] = useState(false);

  return (
    <>
      {
        venueDetailQuery.status === 'loading' || venueCodeDetailQuery.status === 'loading' ?
          <Spinner />
          :
          venueDetailQuery.status === 'error' || venueCodeDetailQuery.status === 'error' ?
            <Box align='center' justify='center' pad={{ left: 'large', right: 'large', top: 'medium' }}>
              <Heading textAlign='center' level="3">Something went wrong, refresh?</Heading>
            </Box>
            :
            <Box align="center" justify='center' animation='slideUp' pad={{ left: 'large', right: 'large', top: 'medium' }}>
              {
                checkedIn ?
                  <Box align='center' justify='center' animation='fadeIn' pad={{ top: 'xlarge' }}>
                    <Heading textAlign='center' level="3">Thanks for checking in to {venueDetailQuery.data.name || ''}!</Heading>
                    <Box direction="row" align="center">
                      <Button
                        primary
                        label="Check-in another?"
                        onClick={(e) => {
                          e.preventDefault()
                          window.location.reload(false)
                        }}
                      />
                    </Box>
                  </Box>
                  :
                  venueCodeDetailQuery.data.isValidCode ?
                    <CheckInForm
                      venueName={venueDetailQuery.data.name}
                      venueId={urlParams.id}
                      venueCode={urlParams.code}
                      venueCodeId={venueCodeDetailQuery.data.id}
                      venueCodeName={venueCodeDetailQuery.data.name}
                      setCheckedIn={setCheckedIn}
                    />
                    :
                    <Box align='center' justify='center' pad={{ left: 'large', right: 'large', top: 'medium' }}>
                      <Heading textAlign='center' level="3">Sorry, this code is no longer active.</Heading>
                    </Box>
              }
            </Box>
      }
    </>
  )
}

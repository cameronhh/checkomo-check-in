import React, { useState } from 'react';

import { Box, Button, Form, FormField, Heading, TextInput } from 'grommet';

import { postVisit } from '../api';

import { useMutation } from 'react-query';

export const CheckInForm = ({ setCheckedIn, ...props }) => {
  const [addVisit] = useMutation(postVisit, {
    onSuccess: () => {
      setCheckedIn(true);
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValue, setFormValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    checkInTime: '',
  });

  return (
    <Form
      value={formValue}
      validate="blur"
      onChange={(nextValue) => setFormValue(nextValue)}
      onSubmit={async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        addVisit({
          ...formValue,
          venueId: props.venueId,
          venueCode: props.venueCode,
          venueCodeId: props.venueCodeId,
        });
      }}
    >
      <Box align="center" pad={{ bottom: 'large' }} gap="small">
        <Heading textAlign="center" margin={{ bottom: 'none' }} level="2">
          Check-in to {props.venueName}
        </Heading>
        {props.venueCodeName ? (
          <Heading textAlign="center" margin="none" level="3">
            {props.venueCodeName}
          </Heading>
        ) : null}
      </Box>
      <FormField required label="First Name" name="firstName">
        <TextInput type="input" name="firstName" />
      </FormField>
      <FormField required label="Last Name" name="lastName">
        <TextInput name="lastName" type="input" />
      </FormField>
      <FormField required label="Email" name="email">
        <TextInput name="email" type="email" />
      </FormField>
      <FormField required label="Phone" name="phone">
        <TextInput name="phone" type="input" />
      </FormField>
      <FormField required label="Address" name="address">
        <TextInput name="address" type="input" />
      </FormField>
      <Box pad={{ top: 'large', bottom: 'large' }} direction="row" justify="center">
        <Button type="submit" disabled={isSubmitting} primary label="Check In Now" />
      </Box>
    </Form>
  );
};

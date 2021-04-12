import { gql } from '@apollo/client';

export const HOUSES = gql`
  query houses {
    houses {
      uuid
      region
      name
      details
      number
      starts_at
      ends_at
      status
    }
  }
`;

export const YEARS = gql`
  query years {
    years
  }
`;

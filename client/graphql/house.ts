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

export const yearOfHouses = gql`
  query yearOfHouses($year: Int!) {
    yearOfHouses(year: $year) {
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

export const pullHouses = gql`
  mutation pullHouses {
    pullHouses {
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

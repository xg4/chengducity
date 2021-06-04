import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type House = {
  __typename?: 'House';
  uuid: Scalars['String'];
  region: Scalars['String'];
  name: Scalars['String'];
  details: Scalars['String'];
  quantity: Scalars['Int'];
  startedAt: Scalars['DateTime'];
  finishedAt: Scalars['DateTime'];
  status: Scalars['String'];
  hash: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  pullHouses: Array<House>;
};

export type Query = {
  __typename?: 'Query';
  houses: Array<House>;
  yearOfHouses: Array<House>;
  recordsCount: Scalars['Int'];
  years: Array<Scalars['String']>;
};

export type QueryYearOfHousesArgs = {
  year: Scalars['Int'];
};

export type HousesQueryVariables = Exact<{ [key: string]: never }>;

export type HousesQuery = { __typename?: 'Query' } & {
  houses: Array<
    { __typename?: 'House' } & Pick<
      House,
      | 'uuid'
      | 'region'
      | 'name'
      | 'details'
      | 'quantity'
      | 'startedAt'
      | 'finishedAt'
      | 'status'
    >
  >;
};

export type RecordsCountQueryVariables = Exact<{ [key: string]: never }>;

export type RecordsCountQuery = { __typename?: 'Query' } & Pick<
  Query,
  'recordsCount'
>;

export type YearOfHousesQueryVariables = Exact<{
  year: Scalars['Int'];
}>;

export type YearOfHousesQuery = { __typename?: 'Query' } & {
  yearOfHouses: Array<
    { __typename?: 'House' } & Pick<
      House,
      | 'uuid'
      | 'region'
      | 'name'
      | 'details'
      | 'quantity'
      | 'startedAt'
      | 'finishedAt'
      | 'status'
    >
  >;
};

export type PullHousesMutationVariables = Exact<{ [key: string]: never }>;

export type PullHousesMutation = { __typename?: 'Mutation' } & {
  pullHouses: Array<
    { __typename?: 'House' } & Pick<
      House,
      | 'uuid'
      | 'region'
      | 'name'
      | 'details'
      | 'quantity'
      | 'startedAt'
      | 'finishedAt'
      | 'status'
    >
  >;
};

export const HousesDocument = gql`
  query houses {
    houses {
      uuid
      region
      name
      details
      quantity
      startedAt
      finishedAt
      status
    }
  }
`;

/**
 * __useHousesQuery__
 *
 * To run a query within a React component, call `useHousesQuery` and pass it any options that fit your needs.
 * When your component renders, `useHousesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHousesQuery({
 *   variables: {
 *   },
 * });
 */
export function useHousesQuery(
  baseOptions?: Apollo.QueryHookOptions<HousesQuery, HousesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<HousesQuery, HousesQueryVariables>(
    HousesDocument,
    options,
  );
}
export function useHousesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<HousesQuery, HousesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<HousesQuery, HousesQueryVariables>(
    HousesDocument,
    options,
  );
}
export type HousesQueryHookResult = ReturnType<typeof useHousesQuery>;
export type HousesLazyQueryHookResult = ReturnType<typeof useHousesLazyQuery>;
export type HousesQueryResult = Apollo.QueryResult<
  HousesQuery,
  HousesQueryVariables
>;
export const RecordsCountDocument = gql`
  query recordsCount {
    recordsCount
  }
`;

/**
 * __useRecordsCountQuery__
 *
 * To run a query within a React component, call `useRecordsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecordsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecordsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecordsCountQuery(
  baseOptions?: Apollo.QueryHookOptions<
    RecordsCountQuery,
    RecordsCountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RecordsCountQuery, RecordsCountQueryVariables>(
    RecordsCountDocument,
    options,
  );
}
export function useRecordsCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RecordsCountQuery,
    RecordsCountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RecordsCountQuery, RecordsCountQueryVariables>(
    RecordsCountDocument,
    options,
  );
}
export type RecordsCountQueryHookResult = ReturnType<
  typeof useRecordsCountQuery
>;
export type RecordsCountLazyQueryHookResult = ReturnType<
  typeof useRecordsCountLazyQuery
>;
export type RecordsCountQueryResult = Apollo.QueryResult<
  RecordsCountQuery,
  RecordsCountQueryVariables
>;
export const YearOfHousesDocument = gql`
  query yearOfHouses($year: Int!) {
    yearOfHouses(year: $year) {
      uuid
      region
      name
      details
      quantity
      startedAt
      finishedAt
      status
    }
  }
`;

/**
 * __useYearOfHousesQuery__
 *
 * To run a query within a React component, call `useYearOfHousesQuery` and pass it any options that fit your needs.
 * When your component renders, `useYearOfHousesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useYearOfHousesQuery({
 *   variables: {
 *      year: // value for 'year'
 *   },
 * });
 */
export function useYearOfHousesQuery(
  baseOptions: Apollo.QueryHookOptions<
    YearOfHousesQuery,
    YearOfHousesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<YearOfHousesQuery, YearOfHousesQueryVariables>(
    YearOfHousesDocument,
    options,
  );
}
export function useYearOfHousesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    YearOfHousesQuery,
    YearOfHousesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<YearOfHousesQuery, YearOfHousesQueryVariables>(
    YearOfHousesDocument,
    options,
  );
}
export type YearOfHousesQueryHookResult = ReturnType<
  typeof useYearOfHousesQuery
>;
export type YearOfHousesLazyQueryHookResult = ReturnType<
  typeof useYearOfHousesLazyQuery
>;
export type YearOfHousesQueryResult = Apollo.QueryResult<
  YearOfHousesQuery,
  YearOfHousesQueryVariables
>;
export const PullHousesDocument = gql`
  mutation pullHouses {
    pullHouses {
      uuid
      region
      name
      details
      quantity
      startedAt
      finishedAt
      status
    }
  }
`;
export type PullHousesMutationFn = Apollo.MutationFunction<
  PullHousesMutation,
  PullHousesMutationVariables
>;

/**
 * __usePullHousesMutation__
 *
 * To run a mutation, you first call `usePullHousesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePullHousesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pullHousesMutation, { data, loading, error }] = usePullHousesMutation({
 *   variables: {
 *   },
 * });
 */
export function usePullHousesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PullHousesMutation,
    PullHousesMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PullHousesMutation, PullHousesMutationVariables>(
    PullHousesDocument,
    options,
  );
}
export type PullHousesMutationHookResult = ReturnType<
  typeof usePullHousesMutation
>;
export type PullHousesMutationResult = Apollo.MutationResult<PullHousesMutation>;
export type PullHousesMutationOptions = Apollo.BaseMutationOptions<
  PullHousesMutation,
  PullHousesMutationVariables
>;

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
};
export default result;

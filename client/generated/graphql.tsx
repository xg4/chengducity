import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type House = {
  __typename?: 'House';
  uuid: Scalars['String'];
  region: Scalars['String'];
  name: Scalars['String'];
  details: Scalars['String'];
  number: Scalars['String'];
  starts_at: Scalars['String'];
  ends_at: Scalars['String'];
  status: Scalars['String'];
  source: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  houses: Array<House>;
  years: Array<Scalars['String']>;
};

export type HousesQueryVariables = Exact<{ [key: string]: never; }>;


export type HousesQuery = (
  { __typename?: 'Query' }
  & { houses: Array<(
    { __typename?: 'House' }
    & Pick<House, 'uuid' | 'region' | 'name' | 'details' | 'number' | 'starts_at' | 'ends_at' | 'status'>
  )> }
);

export type YearsQueryVariables = Exact<{ [key: string]: never; }>;


export type YearsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'years'>
);


export const HousesDocument = gql`
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
export function useHousesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HousesQuery, HousesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<HousesQuery, HousesQueryVariables>(HousesDocument, options);
      }
export function useHousesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HousesQuery, HousesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<HousesQuery, HousesQueryVariables>(HousesDocument, options);
        }
export type HousesQueryHookResult = ReturnType<typeof useHousesQuery>;
export type HousesLazyQueryHookResult = ReturnType<typeof useHousesLazyQuery>;
export type HousesQueryResult = ApolloReactCommon.QueryResult<HousesQuery, HousesQueryVariables>;
export const YearsDocument = gql`
    query years {
  years
}
    `;

/**
 * __useYearsQuery__
 *
 * To run a query within a React component, call `useYearsQuery` and pass it any options that fit your needs.
 * When your component renders, `useYearsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useYearsQuery({
 *   variables: {
 *   },
 * });
 */
export function useYearsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<YearsQuery, YearsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<YearsQuery, YearsQueryVariables>(YearsDocument, options);
      }
export function useYearsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<YearsQuery, YearsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<YearsQuery, YearsQueryVariables>(YearsDocument, options);
        }
export type YearsQueryHookResult = ReturnType<typeof useYearsQuery>;
export type YearsLazyQueryHookResult = ReturnType<typeof useYearsLazyQuery>;
export type YearsQueryResult = ApolloReactCommon.QueryResult<YearsQuery, YearsQueryVariables>;
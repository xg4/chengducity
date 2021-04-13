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

export type Mutation = {
  __typename?: 'Mutation';
  pullHouses: Array<House>;
  pushMessage: Scalars['Boolean'];
};


export type MutationPushMessageArgs = {
  data: PushMessageInputs;
};

export type PushMessageInputs = {
  token: Scalars['String'];
  content: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  houses: Array<House>;
  yearOfHouses: Array<House>;
  years: Array<Scalars['String']>;
};


export type QueryYearOfHousesArgs = {
  year: Scalars['Int'];
};

export type HousesQueryVariables = Exact<{ [key: string]: never; }>;


export type HousesQuery = (
  { __typename?: 'Query' }
  & { houses: Array<(
    { __typename?: 'House' }
    & Pick<House, 'uuid' | 'region' | 'name' | 'details' | 'number' | 'starts_at' | 'ends_at' | 'status'>
  )> }
);

export type YearOfHousesQueryVariables = Exact<{
  year: Scalars['Int'];
}>;


export type YearOfHousesQuery = (
  { __typename?: 'Query' }
  & { yearOfHouses: Array<(
    { __typename?: 'House' }
    & Pick<House, 'uuid' | 'region' | 'name' | 'details' | 'number' | 'starts_at' | 'ends_at' | 'status'>
  )> }
);

export type PullHousesMutationVariables = Exact<{ [key: string]: never; }>;


export type PullHousesMutation = (
  { __typename?: 'Mutation' }
  & { pullHouses: Array<(
    { __typename?: 'House' }
    & Pick<House, 'uuid' | 'region' | 'name' | 'details' | 'number' | 'starts_at' | 'ends_at' | 'status'>
  )> }
);

export type PushMessageMutationVariables = Exact<{
  data: PushMessageInputs;
}>;


export type PushMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'pushMessage'>
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
export const YearOfHousesDocument = gql`
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
export function useYearOfHousesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<YearOfHousesQuery, YearOfHousesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<YearOfHousesQuery, YearOfHousesQueryVariables>(YearOfHousesDocument, options);
      }
export function useYearOfHousesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<YearOfHousesQuery, YearOfHousesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<YearOfHousesQuery, YearOfHousesQueryVariables>(YearOfHousesDocument, options);
        }
export type YearOfHousesQueryHookResult = ReturnType<typeof useYearOfHousesQuery>;
export type YearOfHousesLazyQueryHookResult = ReturnType<typeof useYearOfHousesLazyQuery>;
export type YearOfHousesQueryResult = ApolloReactCommon.QueryResult<YearOfHousesQuery, YearOfHousesQueryVariables>;
export const PullHousesDocument = gql`
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
export type PullHousesMutationFn = ApolloReactCommon.MutationFunction<PullHousesMutation, PullHousesMutationVariables>;

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
export function usePullHousesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PullHousesMutation, PullHousesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<PullHousesMutation, PullHousesMutationVariables>(PullHousesDocument, options);
      }
export type PullHousesMutationHookResult = ReturnType<typeof usePullHousesMutation>;
export type PullHousesMutationResult = ApolloReactCommon.MutationResult<PullHousesMutation>;
export type PullHousesMutationOptions = ApolloReactCommon.BaseMutationOptions<PullHousesMutation, PullHousesMutationVariables>;
export const PushMessageDocument = gql`
    mutation pushMessage($data: PushMessageInputs!) {
  pushMessage(data: $data)
}
    `;
export type PushMessageMutationFn = ApolloReactCommon.MutationFunction<PushMessageMutation, PushMessageMutationVariables>;

/**
 * __usePushMessageMutation__
 *
 * To run a mutation, you first call `usePushMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePushMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pushMessageMutation, { data, loading, error }] = usePushMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function usePushMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PushMessageMutation, PushMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<PushMessageMutation, PushMessageMutationVariables>(PushMessageDocument, options);
      }
export type PushMessageMutationHookResult = ReturnType<typeof usePushMessageMutation>;
export type PushMessageMutationResult = ApolloReactCommon.MutationResult<PushMessageMutation>;
export type PushMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<PushMessageMutation, PushMessageMutationVariables>;
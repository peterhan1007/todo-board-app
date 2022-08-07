import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthUserPayload = {
  __typename?: 'AuthUserPayload';
  token: Scalars['String'];
  user: User;
};

export type Job = {
  __typename?: 'Job';
  description: Scalars['String'];
  id: Scalars['Int'];
  isApproved: Scalars['Boolean'];
  rate: Scalars['Float'];
  status: Scalars['String'];
  title: Scalars['String'];
  user: User;
};

export type JobInput = {
  description?: InputMaybe<Scalars['String']>;
  rate?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createJob?: Maybe<Job>;
  login?: Maybe<AuthUserPayload>;
  register?: Maybe<AuthUserPayload>;
  removeJob?: Maybe<Scalars['Boolean']>;
  updateJob?: Maybe<Job>;
};


export type MutationCreateJobArgs = {
  jobInfo: JobInput;
};


export type MutationLoginArgs = {
  userInfo: LoginUserInput;
};


export type MutationRegisterArgs = {
  userInfo: RegisterUserInput;
};


export type MutationRemoveJobArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateJobArgs = {
  id: Scalars['Int'];
  jobInfo: JobInput;
};

export type Query = {
  __typename?: 'Query';
  getAllJobs?: Maybe<Array<Job>>;
  getJobById?: Maybe<Job>;
  getUser?: Maybe<User>;
  hello: Scalars['String'];
};


export type QueryGetJobByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};

export type RegisterUserInput = {
  description: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  rate: Scalars['Float'];
  role: Scalars['String'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  description: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  isApproved: Scalars['Boolean'];
  jobs: Array<Job>;
  name: Scalars['String'];
  password: Scalars['String'];
  rate: Scalars['Float'];
  role: Scalars['String'];
  title: Scalars['String'];
};

export type AuthLoginMutationVariables = Exact<{
  userInfo: LoginUserInput;
}>;


export type AuthLoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthUserPayload', token: string, user: { __typename?: 'User', id: number, name: string, description: string, title: string } } | null };

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_1_Query = { __typename?: 'Query', getAllJobs?: Array<{ __typename?: 'Job', id: number, title: string, description: string, user: { __typename?: 'User', name: string, email: string } }> | null };

export type Unnamed_2_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_2_Query = { __typename?: 'Query', getAllJobs?: Array<{ __typename?: 'Job', id: number, title: string, description: string, user: { __typename?: 'User', name: string, email: string } }> | null };


export const AuthLoginDocument = gql`
    mutation authLogin($userInfo: LoginUserInput!) {
  login(userInfo: $userInfo) {
    user {
      id
      name
      description
      title
    }
    token
  }
}
    `;
export type AuthLoginMutationFn = Apollo.MutationFunction<AuthLoginMutation, AuthLoginMutationVariables>;

/**
 * __useAuthLoginMutation__
 *
 * To run a mutation, you first call `useAuthLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authLoginMutation, { data, loading, error }] = useAuthLoginMutation({
 *   variables: {
 *      userInfo: // value for 'userInfo'
 *   },
 * });
 */
export function useAuthLoginMutation(baseOptions?: Apollo.MutationHookOptions<AuthLoginMutation, AuthLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthLoginMutation, AuthLoginMutationVariables>(AuthLoginDocument, options);
      }
export type AuthLoginMutationHookResult = ReturnType<typeof useAuthLoginMutation>;
export type AuthLoginMutationResult = Apollo.MutationResult<AuthLoginMutation>;
export type AuthLoginMutationOptions = Apollo.BaseMutationOptions<AuthLoginMutation, AuthLoginMutationVariables>;
export const Document = gql`
    {
  getAllJobs {
    id
    title
    description
    user {
      name
      email
    }
  }
}
    `;

/**
 * __useQuery__
 *
 * To run a query within a React component, call `useQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuery(baseOptions?: Apollo.QueryHookOptions<Query, QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Query, QueryVariables>(Document, options);
      }
export function useLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Query, QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Query, QueryVariables>(Document, options);
        }
export type QueryHookResult = ReturnType<typeof useQuery>;
export type LazyQueryHookResult = ReturnType<typeof useLazyQuery>;
export type QueryResult = Apollo.QueryResult<Query, QueryVariables>;
export const Document = gql`
    {
  getAllJobs {
    id
    title
    description
    user {
      name
      email
    }
  }
}
    `;

/**
 * __useQuery__
 *
 * To run a query within a React component, call `useQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuery(baseOptions?: Apollo.QueryHookOptions<Query, QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Query, QueryVariables>(Document, options);
      }
export function useLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Query, QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Query, QueryVariables>(Document, options);
        }
export type QueryHookResult = ReturnType<typeof useQuery>;
export type LazyQueryHookResult = ReturnType<typeof useLazyQuery>;
export type QueryResult = Apollo.QueryResult<Query, QueryVariables>;
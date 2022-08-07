/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthUserPayload = {
  __typename?: "AuthUserPayload";
  token: Scalars["String"];
  user: User;
};

export type Job = {
  __typename?: "Job";
  description: Scalars["String"];
  id: Scalars["Int"];
  isApproved: Scalars["Boolean"];
  rate: Scalars["Float"];
  status: Scalars["String"];
  title: Scalars["String"];
  user: User;
};

export type JobInput = {
  description?: InputMaybe<Scalars["String"]>;
  rate?: InputMaybe<Scalars["Float"]>;
  status?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type LoginUserInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createJob?: Maybe<Job>;
  login?: Maybe<AuthUserPayload>;
  register?: Maybe<AuthUserPayload>;
  removeJob?: Maybe<Scalars["Boolean"]>;
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
  id: Scalars["Int"];
};

export type MutationUpdateJobArgs = {
  id: Scalars["Int"];
  jobInfo: JobInput;
};

export type Query = {
  __typename?: "Query";
  getAllJobs?: Maybe<Array<Job>>;
  getJobById?: Maybe<Job>;
  getUser?: Maybe<User>;
  hello: Scalars["String"];
};

export type QueryGetJobByIdArgs = {
  id: Scalars["Int"];
};

export type QueryGetUserArgs = {
  id: Scalars["Int"];
};

export type RegisterUserInput = {
  description: Scalars["String"];
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
  rate: Scalars["Float"];
  role: Scalars["String"];
  title: Scalars["String"];
};

export type User = {
  __typename?: "User";
  description: Scalars["String"];
  email: Scalars["String"];
  id: Scalars["Int"];
  isApproved: Scalars["Boolean"];
  jobs: Array<Job>;
  name: Scalars["String"];
  password: Scalars["String"];
  rate: Scalars["Float"];
  role: Scalars["String"];
  title: Scalars["String"];
};

export type AuthLoginMutationVariables = Exact<{
  userInfo: LoginUserInput;
}>;

export type AuthLoginMutation = {
  __typename?: "Mutation";
  login?: {
    __typename?: "AuthUserPayload";
    token: string;
    user: {
      __typename?: "User";
      id: number;
      name: string;
      description: string;
      title: string;
    };
  } | null;
};

export const AuthLoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "authLogin" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userInfo" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "LoginUserInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "login" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userInfo" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userInfo" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "token" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AuthLoginMutation, AuthLoginMutationVariables>;

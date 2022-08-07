/* eslint-disable */
import * as graphql from './graphql.js';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  mutation authLogin($userInfo: LoginUserInput!) {\n    login(userInfo: $userInfo) {\n      user {\n        id\n        name\n        description\n        title\n      }\n      token\n    }\n  }\n": graphql.AuthLoginDocument,
};

export function gql(source: "\n  mutation authLogin($userInfo: LoginUserInput!) {\n    login(userInfo: $userInfo) {\n      user {\n        id\n        name\n        description\n        title\n      }\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation authLogin($userInfo: LoginUserInput!) {\n    login(userInfo: $userInfo) {\n      user {\n        id\n        name\n        description\n        title\n      }\n      token\n    }\n  }\n"];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($userInfo: LoginUserInput!) {
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

export const REGISTER = gql`
  mutation Register($userInfo: RegisterUserInput!) {
    register(userInfo: $userInfo) {
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

export const CREATEJOB = gql`
  mutation CreateJob($jobInfo: JobInput!) {
    createJob(jobInfo: $jobInfo) {
      id
      title
      status
      description
    }
  }
`;

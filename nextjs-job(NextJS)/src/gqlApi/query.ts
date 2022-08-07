import { gql } from "@apollo/client";

export const GET_ALL_JOB = gql`
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

export const GET_JOB_BY_ID = gql`
  query GetJobById($id: Int!) {
    getJobById(id: $id) {
      id
      title
      description
    }
  }
`;

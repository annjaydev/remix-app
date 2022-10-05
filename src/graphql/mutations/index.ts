import { gql } from '@apollo/client';

export const DELETE_REMIX = gql`
  mutation deleteRemix($id: Int!) {
    deleteRemix(payload: { id: $id })
  }
`;

export const CREATE_REMIX = gql`
  mutation createRemix($remixValues: RemixCreateDTO!) {
    createRemix(payload: $remixValues) {
      id
    }
  }
`;

export const UPDATE_REMIX = gql`
  mutation updateRemix($remixValues: RemixUpdateDTO!) {
    updateRemix(payload: $remixValues) {
      id
    }
  }
`;

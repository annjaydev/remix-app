import { gql } from '@apollo/client';

export const GET_REMIXES = gql`
  query {
    remixes(payload: {}) {
      items {
        id
        authorEmail
        createdDate
        description
        isStore
        genre
        name
        price
        trackLength
      }
    }
  }
`;

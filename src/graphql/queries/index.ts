import { gql } from '@apollo/client';

export const GET_REMIXES = gql`
  query remixes($paginate: PaginateDTO, $sorts: [SortDTO!]) {
    remixes(payload: { paginate: $paginate, sorts: $sorts }) {
      meta {
        total
      }
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

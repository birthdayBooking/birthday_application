import { gql } from "graphql-request";

export const PartyQuery = gql`
  query getParties {
    parties {
      id
      name
      email
      contactPerson
      category {
        name
      }
      address
      about
      images {
        url
      }
    }
  }
`;

export const PartyByCategoryName = (categoryName) =>
  gql`
  query getParties {
    parties(where: { category: { name: "` +
  categoryName +
  `" } }) {
      id
      name
      email
      contactPerson
      category {
        name
      }
      address
      about
      images {
        url
      }
    }
  }
`;

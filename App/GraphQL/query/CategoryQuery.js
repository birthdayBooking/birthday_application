import { gql } from "graphql-request";

const CategoryQuery = gql`
  query GetCategories {
    categories {
      id
      name
      icon {
        url
      }
    }
  }
`;

export default CategoryQuery;

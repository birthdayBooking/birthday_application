import { gql } from "graphql-request";

const SliderQuery = gql`
  query GetSliders {
    sliders {
      id
      name
      image {
        url
      }
    }
  }
`;

export default SliderQuery;

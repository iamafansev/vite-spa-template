import { graphql } from "@/shared/api/models";

export const GetHomePageDataQuery = graphql(/* GraphQL */ `
  query GetHomePageData($offset: Int!, $take: Int = 10) {
    getAllPokemon(offset: $offset, take: $take) {
      key
      color
      height
    }
  }
`);

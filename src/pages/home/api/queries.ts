import { graphql } from "@/shared/api/models";

export const GetHomePageDataQuery = graphql(/* GraphQL */ `
  query GetHomePageData($offset: Int!, $take: Int!) {
    getAllPokemon(offset: $offset, take: $take) {
      key
    }
  }
`);

import { graphql } from "@/shared/api/models";

export const GetHomePageDataQuery = graphql(/* GraphQL */ `
  query GetHomePageData {
    getAllPokemon(offset: 0, take: 10) {
      key
    }
  }
`);

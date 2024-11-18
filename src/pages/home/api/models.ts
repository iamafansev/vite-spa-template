import { graphql } from "@/shared/api/models";

export const GetHomePageDataQuery = graphql(/* GraphQL */ `
   query GetHomePageData {
      getPokemon(pokemon: dragonite) {
         sprite
         num
         species
         color
      }
   }
`);

import type { CodegenConfig } from "@graphql-codegen/cli";

export const config: CodegenConfig = {
    schema: "https://graphqlpokemon.favware.tech/v8/graphql",
    documents: ["src/**/*.{ts,tsx}", "!src/gql/**/*"],
    generates: {
        "./src/shared/api/models/": {
            preset: "client",
        },
    },
};

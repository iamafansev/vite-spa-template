import type { CodegenConfig } from "@graphql-codegen/cli";

export const getCodegenConfig = (
  params: Required<Pick<CodegenConfig, "schema">>
): CodegenConfig => ({
  schema: params.schema,
  documents: ["src/**/*.{ts,tsx}", "!src/gql/**/*"],
  generates: {
    "./src/shared/api/models/": {
      preset: "client",
    },
  },
});

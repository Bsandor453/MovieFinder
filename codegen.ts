import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // Location of the schema
  schema: 'https://tmdb.sandbox.zoosh.ie/dev/graphql',

  // Location of the queries
  documents: ['src/**/*.tsx', 'src/**/*.ts'],

  // What and where to generate
  generates: {
    './src/gql/': {
      preset: 'client', // Uses the client-preset
      presetConfig: {
        clean: true, // Deletes old generated files before regenerating
      },
      config: {
        headerComments: ['@generated', 'biome-ignore-all'], // Ignore Biome check
        useTypeImports: true,
      },
      plugins: [],
    },
  },
};

export default config;

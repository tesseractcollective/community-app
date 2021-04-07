const dotenv = require("dotenv")
dotenv.config();

module.exports = {
  schema: [
    {
      'https://api.thelitas.co/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
        },
      },
    },
  ],
  documents: ['app/**/*.graphql'],
  overwrite: true,
  generates: {
    'app/graphql-api/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'urql-introspection',
        'typescript-urql',
      ],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

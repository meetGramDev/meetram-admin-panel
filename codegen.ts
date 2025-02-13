import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  documents: ['./src/queries/**/*.ts'],
  generates: {
    'src/': {
      config: {
        withHooks: true,
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: 'types.ts',
        extension: '.generated.tsx',
      },
    },
    'src/types.ts': { plugins: ['typescript'] },
  },
  ignoreNoDocuments: true, // for better experience with the watcher
  schema: 'https://inctagram.work/api/v1/graphql',
}

export default config

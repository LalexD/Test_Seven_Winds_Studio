import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: process.env.API_SCHEMA_URL ?? 'http://185.244.172.108:8081/v2/api-docs',
  apiFile: './src/api/emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './src/api/Api.ts',
  exportName: 'Api',
  hooks: true,
};

export default config;

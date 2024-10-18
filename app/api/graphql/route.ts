import DB from '@/database';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'drizzle-graphql';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

const { schema } = buildSchema(DB);
const server = new ApolloServer({
  schema,
  includeStacktraceInErrorResponses: process.env.NODE_ENV !== 'production', // Enable stacktrace in development
  nodeEnv: process.env.NODE_ENV, // Set node environment
  introspection: process.env.NODE_ENV !== 'production' // Enable introspection in development
});

const handler = startServerAndCreateNextHandler(server);

export const GET = handler;
export const POST = handler;

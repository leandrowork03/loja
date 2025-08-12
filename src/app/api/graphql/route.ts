// src/app/api/graphql/route.ts
import { createYoga } from 'graphql-yoga';
import { schema } from '@/lib/schema';

const { handleRequest } = createYoga({
  schema,
  // A propriedade 'endpoint' foi removida, pois a rota é definida pelo nome do arquivo
});

export { handleRequest as GET, handleRequest as POST };
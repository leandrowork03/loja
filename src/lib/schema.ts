// src/lib/schema.ts
import { createSchema } from 'graphql-yoga';
import { mockPosts } from './mockData';
import { GraphQLSchema } from 'graphql';

export const schema = createSchema({
  typeDefs: `
    type Post {
      id: ID!
      title: String!
      price: Float!
      description: String!
      img: String!
    }

    type Query {
      posts: [Post!]!
      post(id: ID!): Post
    }
  `,
  resolvers: {
    Query: {
      posts: () => mockPosts,
      post: (_, { id }) => {
        return mockPosts.find((post) => post.id === id);
      },
    },
  },
}) as GraphQLSchema;


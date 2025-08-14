import { createSchema, createYoga } from 'graphql-yoga';
import { NextRequest } from 'next/server';
import { mockPosts } from '@/lib/mockData';

type Post = {
  id: string;
  title: string;
  price: number;
  description: string;
  img: string;
};

const schema = createSchema({
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
      posts: (): Post[] => mockPosts,
      post: (_: unknown, { id }: { id: string }): Post | undefined => {
        return mockPosts.find((post) => String(post.id) === id);
      },
    },
  },
});

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  maskedErrors: false,
});

export async function GET(request: NextRequest) {
  return yoga.fetch(request);
}

export async function POST(request: NextRequest) {
  return yoga.fetch(request);
}
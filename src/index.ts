import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolver';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { verifyToken } from './utils/jwt';


export const prisma = new PrismaClient();

interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  user: any
  req: any
  res: any
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }): Promise<Context> => {
      const token = req.headers.authorization || "";
      const userInfo = await verifyToken(token);
console.log(token)
      return {
        prisma,
        user: userInfo,
        req,
        res,
      };
    },
  });

  console.log(`🚀 Server ready at ${url}`);
}

startServer().catch(console.error);
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from '@prisma/client/runtime/library';
import { typeDefs } from './schema';
import { resolvers } from './resolver';
import { jwtHelper } from './utils/jwt';


export const prisma = new PrismaClient();

interface Context {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    userInfo: {
        userId: number | null
    } | null
}



const main = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });
        

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req }): Promise<Context> => {
            const userInfo = await jwtHelper.getUserInfoFromToken(req.headers.authorization as string)

            console.log("User Info:", userInfo)

            return {
                prisma,
                userInfo: userInfo ? { userId: userInfo.userId as number } : null
            }
        }
    });

    console.log(`🚀  Server ready at: ${url}`);
}

main();
// Alternative: Use require for now
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
export const resolvers = {
    Query: {
        hello: () => "Hello from GraphQL API"
    },
    Mutation: {
        signup: async (parent: any, args: any, context: any) => {
            return await prisma.user.create({ 
                data: args
            });
        }
    }
}
// Alternative: Use require for now
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

interface UserInfo {
    name: string;
    email: String
    password: String

}


import jwt from 'jsonwebtoken';

export const resolvers = {
    Query: {
        users: async (parent: any, args: UserInfo, context: any) => {
            return await prisma.user.findMany();
        },
    },

        Mutation: {
            signup: async (parent: any, args: UserInfo, context: any) => {

                const hashedPassword = await bcrypt.hash(args.password as string, 12);
                const newUser = await prisma.user.create({
                    data: {
                    name: args.name,
                    email: args.email,
                    password: hashedPassword,
                    }
                });

                const token = jwt.sign({ userId: newUser.id }, 'APP_SECRET', { expiresIn: '7d' })

                return {
                    token
                }
            }
        }
    }
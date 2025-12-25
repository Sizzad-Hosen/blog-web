
interface UserInfo {
    name: string;
    email: String
    password: String

}


interface Parent {}
interface PostsArgs {}
interface ResolverContext { prisma: any }

export const Query = {
       me: async (parent: any, agrs: any, { prisma, userInfo }: any) => {
        return await prisma.user.findUnique({
            where: {
                id: userInfo.userId
            }
        })
    },
    profile: async (parent: any, args: any, { prisma, userInfo }: any) => {
        return await prisma.profile.findUnique({
            where: {
                userId: Number(args.userId)
            }
        })
    },
    users: async (parent: Parent, args: UserInfo, { prisma }: ResolverContext) => {
        return await prisma.user.findMany();
    },
    posts: async (parent: Parent, args: PostsArgs, { prisma }: ResolverContext) => {
        return await prisma.post.findMany();
    }
}
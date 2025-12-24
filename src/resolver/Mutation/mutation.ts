
interface UserInfo {
    name: string;
    email: String
    password: String

}
import bcrypt from 'bcrypt';
import { createToken } from '../../utils/jwt';
import { userInfo } from 'os';

export const Mutation = {

    signup: async (parent: any, args: UserInfo, { prisma }: any) => {

        const hashedPassword = await bcrypt.hash(args.password as string, 12);
        const newUser = await prisma.user.create({
            data: {
                name: args.name,
                email: args.email,
                password: hashedPassword,
            }
        });

        if (!newUser) {
            throw new Error("Error creating user");
        }



        const token = createToken({ userId: newUser.id }, process.env.SECRET_KEY as string);


        return {
            token
        }
    },

    signin: async (parent: any, args: any, { prisma }: any) => {
        const user = await prisma.user.findUnique({
            where: {
                email: args.email
            }
        });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(args.password as string, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }


        const token = createToken({ userId: user.id }, process.env.SECRET_KEY as string);

        return {
            token
        }
    },
    addPost: async (
        parent: any,
        args: { post: { title: string; content: string } },
        context: { prisma: any; user: any }
    ) => {
        const { prisma, user } = context;
        const { title, content } = args.post;

        if (!user) {
            throw new Error("Unauthorized");
        }

        if (!title || !content) {
            return {
                post: null,
                userError: "Title and content are required",
            };
        }

        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                authorId: user.userId, // যদি relation থাকে
            },
        });

        return {
            post: newPost,
            userError: null,
        };
    },
    updatePost: async (
        parent: any,
        args: { postId: string; post: { title?: string; content?: string } },
        context: { prisma: any; user: any }
    ) => {
        const { prisma, user } = context;
        const { postId, post } = args;

        if (!user) {
            throw new Error("Unauthorized");
        }
        if (!post) {
            throw new Error("not found post");
        }

        // verify ownership by fetching the existing post and comparing authorId
        const existingPost = await prisma.post.findUnique({
            where: {   id: Number(postId) },
        });

        if (!existingPost) {
            throw new Error("Post not found");
        }
        console.log(user.userId, existingPost.authorId)

        if (existingPost.authorId !== user.userId) {
            throw new Error("post not owned by user");
        }

        try {
            const updatedPost = await prisma.post.update({
                where: {
                   id: Number(postId)
                },
                data: post, // ✅ correct place
            });

            return {
                post: updatedPost,
                userError: null,
            };
        } catch (error) {
            return {
                post: null,
                userError: "Post not found or update failed",
            };
        }
    }


}
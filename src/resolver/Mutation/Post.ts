import { checkUserAccess } from "../../utils/checkUserAccess";

interface PostInput {
  title?: string;
  content?: string;
}

export const postResolver = {
  addPost: async (
    parent: any,
    { post }: { post: PostInput },
    { prisma, userInfo }: any
  ) => {

    console.log("User Info in addPost:", userInfo);

    console.log("Post Input:", post);
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }

    if (!post?.title || !post?.content) {
      return {
        userError: "Title and content are required!",
        post: null,
      };
    }

    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: userInfo.userId,
      },
    });

    return {
      userError: null,
      post: newPost,
    };
  },

  updatePost: async (
    parent: any,
    { postId, post }: { postId: number; post: PostInput },
    { prisma, userInfo }: any
  ) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }

    const error = await checkUserAccess(
      prisma,
      userInfo.userId,
      postId
    );

    if (error) {
      return error;
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: post,
    });

    return {
      userError: null,
      post: updatedPost,
    };
  },

  publishPost: async (
    parent: any,
    { postId }: { postId: number },
    { prisma, userInfo }: any
  ) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }

    const error = await checkUserAccess(
      prisma,
      userInfo.userId,
      postId
    );

    if (error) {
      return error;
    }

    const publishedPost = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        published: true,
      },
    });

    return {
      userError: null,
      post: publishedPost,
    };
  },
};

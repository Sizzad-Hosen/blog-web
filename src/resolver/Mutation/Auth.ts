import bcrypt from "bcrypt";
import { jwtHelper } from "../../utils/jwt";

interface SignupArgs {
  name: string;
  email: string;
  password: string;
}

interface SigninArgs {
  email: string;
  password: string;
}

export const authResolver = {
  signup: async (
    parent: any,
    args: SignupArgs,
    { prisma }: any
  ) => {
    // check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email: args.email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(args.password, 12);

    const newUser = await prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        password: hashedPassword,
      },
    });

    const token = jwtHelper.generateToken(
      { userId: newUser.id },
      process.env.JWT_SECRET as string
    );

    return { token };
  },

  signin: async (
    parent: any,
    args: SigninArgs,
    { prisma }: any
  ) => {
    const user = await prisma.user.findUnique({
      where: { email: args.email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(
      args.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
console.log("Signin successful for user:", user.id);

    const token = jwtHelper.generateToken(
      { userId: user.id },
      process.env.JWT_SECRET as string
    );

    return { token };
  },
};

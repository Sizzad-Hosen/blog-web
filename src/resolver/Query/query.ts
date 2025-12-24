
interface UserInfo {
    name: string;
    email: String
    password: String

}


export const Query = {

            users: async (parent: any, args: UserInfo, {prisma}:any) => {
            return await prisma.user.findMany();
       
}
       } 
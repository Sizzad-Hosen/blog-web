
import { Mutation } from './Mutation/mutation';
import { Post } from './Query/post';
import { Profile } from './Query/profile';
import { Query } from './Query/query';
import { User } from './Query/user';



export const resolvers = {
    Query,
    Mutation,
    Post,
    User,
    Profile

    }
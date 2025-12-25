import { authResolver } from "./Auth";
import { postResolver } from "./Post";

export const Mutation = {
  ...authResolver,
  ...postResolver,
};

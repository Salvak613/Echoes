import { getOne } from "@/lib/user/getUser";
import { UserModel } from "@/model/UserModel";

export async function getOneByEmail(email: string): Promise<UserModel> {
  return getOne(email);
}

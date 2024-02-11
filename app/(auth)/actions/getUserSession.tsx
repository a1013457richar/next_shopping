import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]";

export default async function getUserSession() {
  return await getServerSession(authOptions);
}

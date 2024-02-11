import prisma from "../../../lib/prismadb";
import getUserSession from "./getUserSession";

const getCurrentUser = async () => {
  try {
    const session = await getUserSession();

    if (!session?.user?.email) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if(!user) {
      return null;
    }

    return user;
  } catch (error:any) {
    console.error(error);
    return null;
  }
};

export default getCurrentUser;
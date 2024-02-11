import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const lastOrder = await prisma.order.findFirst({
      orderBy: {
        createdDate: "desc",
      },
      select: {
        id: true,
      },
    });
    if (!lastOrder) {
      return;
    }
    return NextResponse.json({
      orderId: lastOrder.id,
    });
  } catch (e) {
    console.log(e);
  }
}

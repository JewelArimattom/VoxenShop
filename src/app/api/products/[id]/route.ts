import { NextResponse } from "next/server";
import { products } from "@/data/products";

type Params = Promise<{ id: string }>;

export async function GET(
  request: Request,
  { params }: { params: Params }
) {
  const { id } = await params;
  const productId = parseInt(id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}

import { connectToDb } from "@/lib/utils";
import { Post } from "@/lib/model";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const GET = async (request, { params }) => {
  const { slug } = params;
  console.log(slug);
  try {
    await connectToDb(); // Ensure you await the connection
    const post = await Post.findOne({ slug: slug });
    return NextResponse.json(post);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get post");
  }
};

export const DELETE = async (request, { params }) => {
  const { slug } = params;

  try {
    await connectToDb(); // Ensure you await the connection
    await Post.deleteOne({ slug });
    revalidatePath("/blog");
    revalidatePath("/admin");
    return NextResponse.json("Post deleted");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete post!");
  }
};

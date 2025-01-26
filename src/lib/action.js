"use server";
import { Post, User } from "./model";
import { revalidatePath } from "next/cache";
import { connectTob } from "./utils";
import { signIn } from "./auth";
import bcrypt from "bcryptjs";
export const addPost = async (provState, formdata) => {
  const { title, desc, slug, userId } = Object.fromEntries(formdata);
  try {
    connectTob();
    const newPost = await Post({ title, desc, slug, userId });
    await newPost.save();
    console.log("save in db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "some think wating wrong" };
  }
};
export const deletePost = async (formdata) => {
  const { id } = Object.fromEntries(formdata);
  try {
    connectTob();
    await Post.findByIdAndDelete(id);
    console.log("post deleted");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};
export const addUser = async (provState, formData) => {
  const { username, email, password, img, isAdmin } =
    Object.fromEntries(formData);
  try {
    connectTob();
    const user = await User.findOne({ username });
    if (user) return { error: "Username already exists" };
    const s = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, s);
    await User.create({
      username,
      email,
      password: hashPassword,
      img,
      isAdmin,
    });
    revalidatePath("/admin");
    console.log("User created");
  } catch (err) {
    console.log(err);
    return { error: "something went wrong" };
  }
};
export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectTob();
    await User.findByIdAndDelete(id);
    console.log("User deleted");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "something went wrong" };
  }
};

export const handleGitubSignIn = async () => {
  await signIn("github");
};
// export const register = async (priviousState, formdata) => {
//   const { username, email, password, passwordRepeat, img } =
//     Object.fromEntries(formdata);
//   if (password !== passwordRepeat) return { error: "Passwords do not match" };
//   try {
//     connectTob();
//     const user = await User.findOne({ username });
//     if (user) {
//       return { error: "Username already exists" };
//     }
//     const s = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(password, s);

//     await User.create({ username, email, password: hashPassword, img });
//     revalidatePath("/admin");
//     return { success: true };
//   } catch (err) {
//     console.log(err);
//     throw new Error("something went wrong");
//   }
// };
export const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
    return { success: true };
  } catch (err) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};
export const register = async (prevState, formData) => {
  const { username, email, password, passwordRepeat, img } =
    Object.fromEntries(formData);
  if (password !== passwordRepeat) return { error: "Passwords do not match" };
  try {
    connectTob();
    const user = await User.findOne({ username });
    if (user) return { error: "Username already exists" };
    const s = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, s);
    await User.create({ username, email, password: hashPassword, img });
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

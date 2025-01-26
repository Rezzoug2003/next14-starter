import Image from "next/image";
import styles from "./post.module.css";
import PostUser from "@/components/postUser/PostUser";
import { Suspense } from "react";
import { getPost } from "@/lib/data";
// const getPost= async(slug)=>{
//  const res=await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`)
//  if(!res.ok) throw new Error(`Could not fetch post ${slug}`)
//   return res.json()
// }
const getPostAPI = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`);
  if (!res.ok) throw new Error(`Could not fetch post ${slug}`);
  return res.json();
};
export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  // const post = await getPost(slug);
  const post = await getPostAPI(slug);
  return {
    title: post.title,
    description: post.desc,
  };
};
const page = async ({ params }) => {
  const { slug } = params;
  const post = await getPost(slug);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src={
            post.img
              ? post.img
              : "https://images.pexels.com/photos/19574243/pexels-photo-19574243/free-photo-of-musee-de-la-tour-de-galata-avec-toit-recouvert-d-echafaudages.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt="Post"
          fill
        />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <Suspense fallback={<div>loading...</div>}>
          <PostUser userId={post.userId} />
        </Suspense>
        <p className={styles.desc}>{post.desc}</p>
      </div>
    </div>
  );
};

export default page;

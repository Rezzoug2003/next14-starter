import PostCard from "@/components/postCard/PostCard";
import styles from "./blog.module.css";

// const getPostsAPI= async ()=>{

//   const res=await fetch("https://jsonplaceholder.typicode.com/posts",{next:{revalidate:3600}})
//   if (!res.ok) throw new Error("something went wrongs");
//   return res.json();
// }
const getPostsAPI = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("something went wrongs");
  return res.json();
};
export const metadata = {
  title: "Blog page",
  description: "Next.js description blog page",
};
const blogPage = async () => {
  // const posts = await getPosts();
  const posts = await getPostsAPI();

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default blogPage;

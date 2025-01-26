// const getUser= async(userId)=>{
//     const res=await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`,{cache:"no-store"})
//     if(!res.ok) throw new Error(`Could not fetch post ${userId}`)
//      return res.json()
import styles from './postUser.module.css'
import { getUser } from "@/lib/data"
import Image from "next/image"

//    }
const PostUser = async ({userId}) => {
  console.log(userId)
    const user=await getUser(userId)
  return (
    <div className={styles.details}>
      <Image src={ user.img?user.img:"/noavatar.png"} alt='' width={50} height={50} className={styles.noavatar}/ >
      <div className={styles.detailsText}>
      <div>
    <span>{user.username}</span>
    <span>{user.email}</span>
  </div>
  <div>
              <span>Author</span>
              <span>Username</span>
            </div>

      </div>
      
    </div>
   

  )
}

export default PostUser

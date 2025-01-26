import Image from 'next/image'
import styles from './postCard.module.css'
import Link from 'next/link'
function PostCard({post}) {

  return (
    <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.imgContainer}>
            <Image src="https://images.pexels.com/photos/19574243/pexels-photo-19574243/free-photo-of-musee-de-la-tour-de-galata-avec-toit-recouvert-d-echafaudages.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" fill/>
          </div>
          <span className={styles.date}>2024-4-01</span>
         
        </div>
        <div className={styles.bottom}>
      
            <h2 className={styles.title}>{post.title}</h2>
          
          <p className={styles.desc}>
            {post.body}</p>
            <Link href={`blog/${post.slug}`} className={styles.link} >LEARN MORE</Link>
    </div>
    </div>
  )
}

export default PostCard
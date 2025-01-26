import Image from "next/image";
import styles from "./home.module.css";
import { getServerSession } from "next-auth/next";
import { authOption } from "@/lib/auth";
const Home = async () => {
  const session = await getServerSession(authOption);

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        {session ? (
          <h1 className={styles.title}>{session.user.name}</h1>
        ) : (
          <h1 className={styles.title}>Creative Thoughts Agency.</h1>
        )}

        <p className={styles.desc}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
          blanditiis adipisci minima reiciendis a autem assumenda dolore.
        </p>
        <div className={styles.buttons}>
          <button className={styles.button}>Discover</button>
          <button className={styles.button}>Contact</button>
        </div>
        <div className={styles.brands}>
          <Image
            src="/brands.png"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.brandImg}
          />
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image
          src="/hero.gif"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
};

export default Home;

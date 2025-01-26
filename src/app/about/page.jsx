import Image from "next/image";
import styles from "./about.module.css";
export const metadata = {
  title: "About page",
  description: "Next.js description about page",
};

function aboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About Agency</h2>
        <h1 className={styles.title}>Welcome to Our Agency</h1>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
          ex vel gravida tristique, urna nisi faucibus justo, vel pulvinar neque
          neque in ipsum. Donec ultricies, nisi vel fermentum feugiat, justo
          lectus lobortis neque, in eleifend massa enim vel velit. Donec eget
          massa vel justo consectetur tristique. Nullam facilisis, nunc ut
          mattis consectetur, ex nunc pharetra metus, non consectetur est massa
          id neque.
        </p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>10+</h1>
            <p>Years of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10+</h1>
            <p>Years of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10+</h1>
            <p>Years of experience</p>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/about.png" alt="" fill className={styles.img} />
      </div>
    </div>
  );
}

export default aboutPage;

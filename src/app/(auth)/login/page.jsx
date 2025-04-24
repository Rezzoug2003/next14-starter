import LoginForm from "@/components/loginForm/loginForm";
import styles from "./login.module.css";

const page = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <LoginForm />
      </div>
    </div>
  );
};

export default page;

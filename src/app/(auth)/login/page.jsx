import LoginForm from "@/components/loginForm/loginForm";
import styles from "./login.module.css";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import { useRouter } from "next/navigation";
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

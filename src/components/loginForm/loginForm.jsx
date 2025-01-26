"use client";
import { useRouter } from "next/navigation";
import styles from "./loginForm.module.css";
import { signIn } from "next-auth/react";
import { useFormState } from "react-dom";
import Link from "next/link";
import { useEffect } from "react";
const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn(
      "credentials",
      { username, password },
      { redirect: true, callbackUrl: "/" }
    );
    return { success: true }; // Redirect to dashboard after successful login
  } catch (err) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};
const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/");
      console.log("succer");
    }
  }, [state?.success, router]);
  return (
    <div>
      <button
        className={styles.github}
        onClick={() => {
          signIn("github", { redirect: true, callbackUrl: "/" });
          // Redirect to dashboard after successful login
        }}
      >
        Login with Github
      </button>
      <form className={styles.form} action={formAction}>
        <input type="text" placeholder="username" name="username" />
        <input type="password" placeholder="password" name="password" />
        <button>Login</button>
        {state?.error}
        <Link href="/register">
          {"Don't have an account?"} <b>Register</b>
        </Link>
      </form>
    </div>
  );
};
export default LoginForm;

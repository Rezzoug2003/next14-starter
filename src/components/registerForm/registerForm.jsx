"use client";

import { useRouter } from "next/navigation";
import styles from "./registerForm.module.css";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { register } from "@/lib/action";
import Link from "next/link";

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined);

  const router = useRouter();
  useEffect(() => {
    if (state?.success) {
      router.push("/login");
    }
  }, [state?.success, router]);

  return (
    <div>
      <form action={formAction} className={styles.form}>
        <input type="text" placeholder="username" name="username" />
        <input type="email" placeholder="email" name="email" />
        <input type="password" placeholder="password" name="password" />
        <input
          type="password"
          placeholder="password again"
          name="passwordRepeat"
        />
        <button>Register</button>
        {state?.error}
        <Link href="/login">
          {"Don't have an account?"} <b>login</b>
        </Link>
      </form>
    </div>
  );
};

export default RegisterForm;

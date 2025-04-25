"use client";
import { useState } from "react";
import styles from "./links.module.css";
import Navlink from "./navlink/Navlink";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
const links = [
  {
    title: "HomePage",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];

function Links() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => {
          return <Navlink item={link} key={link.title} />;
        })}
        {session ? (
          <>
            {console.log("++++session++++:", session?.user)}
            {session?.user?.isAdmin && (
              <Navlink item={{ title: "admin", path: "/admin" }} />
            )}
            <button
              className={styles.logout}
              onClick={() => {
                signOut({ redirect: true, callbackUrl: "/login" });
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Navlink item={{ title: "login", path: "/login" }} />
        )}
      </div>

      <Image
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => {
          setOpen(!open);
        }}
        className={styles.buttonMenu}
      />
      {open && (
        <div className={styles.menu}>
          {links.map((link) => {
            return <Navlink item={link} key={link.title} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Links;

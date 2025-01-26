import Image from "next/image";
import styles from "./contact.module.css";
export const metadata = {
  title: "Contect page",
  description: "Next.js description Contect page",
};
function ContactPage() {
  console.log("ContactPage");
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="/contact.png"
          alt="Contact Image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <input type="text" placeholder="Name and Surname" />
          <input type="text" placeholder="Email Address" />
          <input type="text" placeholder="Phone Number (Optional)" />
          <textarea
            placeholder="Your Message"
            id=""
            name=""
            cols="30"
            rows="10"
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;

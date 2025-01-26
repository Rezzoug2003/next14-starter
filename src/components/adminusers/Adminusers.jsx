import styles from "./adminusers.module.css";
import Image from "next/image"; // Ensure Image is imported
import { getUsers } from "@/lib/data";
import { deleteUser } from "@/lib/action";

const Adminusers = async () => {
  try {
    const users = await getUsers();

    if (!users || users.length === 0) {
      return (
        <div className={styles.container}>
          <h1>Users</h1>
          <p>No users found.</p>
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <h1>Users</h1>
        {users.map((user) => (
          <div className={styles.user} key={user.id}>
            <div className={styles.detail}>
              <Image
                src={user.img || "/noAvatar.png"}
                alt={user.username || "User avatar"}
                width={50}
                height={50}
              />
              <span>{user.username}</span>
              <span>{user.email}</span>
            </div>
            <form action={deleteUser}>
              <input type="hidden" name="id" value={user.id} />
              <button type="submit">Delete</button>
            </form>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    return (
      <div className={styles.container}>
        <h1>Users</h1>
        <p>Error loading users. Please try again later.</p>
      </div>
    );
  }
};

export default Adminusers;

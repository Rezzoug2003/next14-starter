import styles from './footer.module.css'
function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Allgoods Store</div>
      <div className={styles.text}>Allgoods Store creative thoughts agency © All rights reserved.</div>
    </div>
  )
}

export default Footer
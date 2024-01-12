import Login from "./auth/login/page"
import styles from "./page.module.css"

export default function Home() {
  return (
    <main className={styles.main}>
      <Login />
    </main>
  )
}

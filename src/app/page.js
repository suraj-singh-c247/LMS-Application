import styles from "@/app/style/page.module.css";
import DashBoard from "./component/DashBoard";

export default function Home() {
  return (
    <main className={styles.main}>
      <DashBoard/>
    </main>
  );
}

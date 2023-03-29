import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Main from "./Main";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
        <main className={styles.main}>
          <Main />
        </main>
    </>
  );
}

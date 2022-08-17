import { Box } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <Box className={styles.container}>
      <Head>
        <title>Fasters</title>
        <meta
          name="og:title"
          property="og:title"
          content="nextjs fasters challenge"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="vercel" href="" />
      </Head>
      <aside className={styles.sidebar}>aside</aside>
      <nav className={styles.nav}>nav</nav>
      <main className={styles.main}>main</main>
    </Box>
  );
}

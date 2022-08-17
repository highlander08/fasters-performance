import { Box } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import Aside from '../components/Aside';
import CalendarNew from '../components/Calendar';
import NavBar from '../components/NavBar';
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
      <Aside />
      <NavBar />

      <main className={styles.main}>
        <div className="Calendar">
        <CalendarNew />
        </div>
        <div className="hoursCalendar">hoursCalendar</div>
        <div className="nextEvent">nextEvent</div>
      </main>
    </Box>
  );
}

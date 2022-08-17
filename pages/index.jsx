import { Typography } from '@material-ui/core';
import { Box, List } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import { useContext } from 'react';
import Aside from '../components/Aside';
import CalendarNew from '../components/Calendar';
import NavBar from '../components/NavBar';
import DayViewTimeTableCell from '../components/Schedule';
import { MyContext } from '../hooks/useContext';
import { useStyles } from '../hooks/useSyles';
import clock from '../public/images/clock.svg';
import styles from '../styles/Home.module.css';

export default function Home() {
  const classes = useStyles();
  const { allEvent, EventFilter } = useContext(MyContext);

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
        <div className="hoursCalendar">
          <DayViewTimeTableCell />
        </div>
        <div className="nextEvent" style={{ padding: '20px' }}>
          <Typography className={classes.TypographyNextEvent}>
            Next Event
          </Typography>

          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 300,
              '& ul': { padding: 0 },
            }}
            subheader={<li />}
          >
          
            {EventFilter
              ? EventFilter.map((filter) => {
                  return (
                    <Box key={filter.titulo} className={classes.BoxNextEvent}>
                      <Box>
                        <Typography className={classes.TypographyNextEventUnit}>
                          {filter.titulo}
                        </Typography>
                        <Typography className={classes.TypographyNextEventView}>
                          {filter.agendaFmtYMD}
                        </Typography>
                      </Box>
                      <Box style={{width: '60%', marginLeft: '70px'}}  className={classes.BoxHour}>
                        <Image src={clock} alt="clock" />
                        <Typography className={classes.TypographyHour}>
                           {filter.horasEnd}  - {filter.horas}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })
              : allEvent.map((agenda) => {
                  return (
                    <Box key={agenda.titulo}>
                      <Box>
                        <Typography className={classes.TypographyNextEventUnit}>
                          {agenda.titulo}
                        </Typography>
                        <Typography className={classes.TypographyNextEventView}>
                          {agenda.agendaFmtYMD}
                        </Typography>
                      </Box>
                      <Box className={classes.BoxHour}>
                        <Image src={clock} alt="clock" />
                        <Typography className={classes.TypographyHour}>
                        {agenda.horasEnd} - {agenda.horas} 
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
            
          </List>
        </div>
      </main>
    </Box>
  );
}

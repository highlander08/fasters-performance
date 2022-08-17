import { Box, Modal, Typography } from '@mui/material';
import { format } from 'date-fns';
import Image from 'next/image';
import React, { useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MyContext } from '../hooks/useContext';
import { useStyles } from '../hooks/useSyles';
import notification from '../public/images/notification.svg';
import profileNav from '../public/images/profile-navbar.svg';
import search from '../public/images/search.svg';
import styles from '../styles/Home.module.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ModalNew from './Modal';

const url = `https://api.openweathermap.org/data/2.5/weather?q=Brazil&APPID=a4850c5e5b7c9f5832a284d1bd12deea`;

async function getLocation() {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const NavBar = () => {
  const { data, isError, isLoading } = useQuery(['location'], () =>
    getLocation(),
  );
  const classes = useStyles();
  const {
    handleOpen,
    setBusca,
    busca,
  } = useContext(MyContext);

  if (isLoading) return 'Loading...';

  if (isError) return 'An error has occurred: ' + error.message;

  return (
    <>
      <div>
        <ModalNew />
      </div>
      <nav className={styles.nav}>
        <Box sx={{ m: 4.7, display: 'flex' }}>
          <Box>
            <Typography className={classes.TypographyHeader}>
              Janeiro{' '}
              <p style={{ padding: '0 5px' }}>
                {data ? data.main.humidity : null}ºC
              </p>
            </Typography>
            <Typography className={classes.TypographyText}>
              Quinta-feira - 4 de Jan 2022
            </Typography>
          </Box>
          <Box className={classes.BoxButton}>
            <button className={classes.ButtonAdd} onClick={handleOpen}>
              <Typography sx={{ color: 'white', padding: '5px' }}>+</Typography>

              <p style={{ fontSize: '12px' }}>Create Event</p>
            </button>
          </Box>
          <Box className={classes.BoxSearch}>
            <Image src={search} alt="search" />{' '}
            <input
              type="text"
              placeholder="Search Task, event, calendar"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </Box>

          <Box
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              gap: '8px',
              width: '56px',
              height: '56px',
              background: '#FAFAFA',
              borderRadius: '12px',
              flex: 'none',
              flexGrow: 0,
              marginRight: '10px',
            }}
          >
            <Image src={notification} alt="notification" />
          </Box>

          <Box
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              gap: '8px',
              width: '56px',
              height: '56px',
              background: '#FAFAFA',
              borderRadius: '12px',
              flex: 'none',
              flexGrow: 0,
              marginRight: '10px',
            }}
          >
            <Image src={profileNav} alt="profileNav" />
          </Box>
        </Box>
      </nav>
    </>
  );
};

export default NavBar;

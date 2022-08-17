import { Typography, Box, Container } from '@mui/material'
import React from 'react'
// import {useStyles} from '../styles/useSyles';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import image from '../public/images/logo.png';
import calendar from '../public/images/calendar.svg';
import message from '../public/images/message.svg';
import diagram from '../public/images/diagram.svg';
import profile from '../public/images/profile-sidebar.svg';
import people from '../public/images/people.svg';
import menuBoard from '../public/images/menu-board.svg';
import setting from '../public/images/setting.svg';
import logout from '../public/images/logout.svg';
import { useStyles } from '../hooks/useSyles';


const Aside = () => {
  const classes = useStyles();

  return (
    <aside className={styles.sidebar}>
    <Container sx={{ m: '3rem' }}>
      <Box className={classes.boxProvider}>
        <Box sx={{ p: 2 }}>
          <Image alt="Vercel logo" src={image} width={205} height={41} />
        </Box>

        <Box className={classes.MainBox}>
          <Image src={calendar} alt="calendar" />{' '}
          <Typography className={classes.TypographyBox}>Agenda</Typography>
        </Box>
        <Box className={classes.MainBox}>
          <Image src={message} alt="message" />{' '}
          <Typography className={classes.TypographyBox}>
            Mensagens
          </Typography>
        </Box>
        <Box className={classes.MainBox}>
          <Image src={diagram} alt="diagram" />{' '}
          <Typography className={classes.TypographyBox}>
            Relatórios
          </Typography>
        </Box>
        <Box sx={{ mt: 5 }}>
          <Typography className={classes.TypographyBoxOnly}>
            My account
          </Typography>
        </Box>
        <Box className={classes.MainBox}>
          <Image src={profile} alt="profile" />{' '}
          <Typography className={classes.TypographyBox}>
            Meus Eventos
          </Typography>
        </Box>
        <Box className={classes.MainBox}>
          <Image src={people} alt="people" />{' '}
          <Typography className={classes.TypographyBox}>
            Meu Time
          </Typography>
        </Box>
        <Box className={classes.MainBox} sx={{ mb: '5rem' }}>
          <Image src={menuBoard} alt="menuBoard" />{' '}
          <Typography className={classes.TypographyBox}>
            Minhas Atividades
          </Typography>
        </Box>
        <Typography className={classes.TypographyBoxOnly}>
          System
        </Typography>
        <Box className={classes.MainBox}>
          <Image src={setting} alt="setting" />{' '}
          <Typography className={classes.TypographyBox}>
            Configurações
          </Typography>
        </Box>
        <Box className={classes.MainBox}>
          <Image src={logout} alt="logout" />{' '}
          <Typography className={classes.TypographyBoxActive}>
            Sair
          </Typography>
        </Box>
      </Box>
    </Container>

    {/* {data ? <span>{data.main.temp}</span> : 'calma'} */}
  </aside>
  )
}

export default Aside
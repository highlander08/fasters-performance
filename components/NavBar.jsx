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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const NavBar = () => {
  const classes = useStyles();
  const {
    allEvent,
    setAllEvent,
    open,
    setOpen,
    handleClose,
    handleOpen,
    submitted,
    valid,
    values,
    setValues,
    setBusca,
    busca,
  } = useContext(MyContext);

  console.log('values', values);

  const dateFormatAux = (date) => {
    const result = format(date, "MMMM dd ','yyyy");
    return result;
  };
  // const hourFormatAux = (date) => {
  //   const result = format(date, 'p');
  //   return result;
  // };

  const dateFormat = (date) => {
    let formatYearMonthDay = dateFormatAux(date);

    // let formatHour = hourFormatAux(date);

    let formatISO8601 = new Date(date).toISOString();

    return [formatYearMonthDay, formatISO8601];
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let agendaYMD = null;

    if (values.agendaFmtYMD != null)
      [agendaYMD] = dateFormat(values.agendaFmtYMD);

    const horasNew = format(values.horas, 'p');

    const horasEndNew = format(values.horasEnd, 'p');

    setAllEvent((prev) => [
      ...prev,
      {
        ...values,
        agendaFmtYMD: agendaYMD,
        horas: horasNew,
        horasEnd: horasEndNew,
      },
    ]);
    setOpen(false);
  };

  return (
    <>
      <div>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <div
              className="form-container"
              style={{
                width: '360px',
                backgroundColor: '#2c2c2e',
                margin: 'auto',
                boxShadow:
                  '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)',
                padding: '10px',
              }}
            >
              <form
                className="register-form"
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  padding: '10px',
                }}
              >
                {submitted && valid ? (
                  <div
                    className="success-message"
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      backgroundColor: '#3f89f8',
                      padding: '15px',
                      color: 'white',
                    }}
                  >
                    Success! Thank you for registering
                  </div>
                ) : null}
                <input
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, titulo: e.target.value }))
                  }
                  value={values.titulo}
                  id="Titulo"
                  className={classes.formFieldStyle}
                  style={{
                    margin: '10px 0 10px 0',
                    padding: '15px',
                    fontSize: '16px',
                    border: 0,
                    fontFamily: "'Roboto', sans-serif",
                    borderRadius: '.25rem',
                  }}
                  type="text"
                  placeholder="Titulo"
                  name="Titulo"
                />
                {submitted && !values.titulo ? (
                  <span className={classes.spanStyle} id="first-name-error">
                    Please enter a first name
                  </span>
                ) : null}
                <input
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      Description: e.target.value,
                    }))
                  }
                  value={values.Description}
                  id="Description"
                  className={classes.formFieldStyle}
                  type="text"
                  placeholder="Description"
                  name="Description"
                />
                {submitted && !values.Description ? (
                  <span className={classes.spanStyle} id="Description-error">
                    Please enter a Description
                  </span>
                ) : null}

                <DatePicker
                  selected={values.agendaFmtYMD}
                  onChange={(date) =>
                    setValues((prev) => ({ ...prev, agendaFmtYMD: date }))
                  }
                  showTimeSelect
                  dateFormat="dd/MM/yyyy"
                  className={classes.formFieldStyle}
                  id="agenda"
                  placeholderText="Data"
                  //minDate={new Date()}
                />
                <DatePicker
                  selected={values.horasEnd}
                  onChange={(date) =>
                    setValues((prev) => ({ ...prev, horasEnd: date }))
                  }
                  showTimeSelect
                  dateFormat="dd/MM/yyyy"
                  className={classes.formFieldStyle}
                  id="agenda"
                  placeholderText="Horario Final"
                  //minDate={new Date()}
                />
                <DatePicker
                  selected={values.horas}
                  onChange={(date) =>
                    setValues((prev) => ({ ...prev, horas: date }))
                  }
                  showTimeSelect
                  dateFormat="dd/MM/yyyy"
                  className={classes.formFieldStyle}
                  id="agenda"
                  placeholderText="Horario Inicial"
                  //minDate={new Date()}
                />
                <button
                  disabled={
                    values.titulo === null && values.Description == null
                      ? true
                      : false
                  }
                  className={classes.formFieldStyleButton}
                  type="submit"
                >
                  Registrar
                </button>
              </form>
            </div>
          </Box>
        </Modal>
      </div>
      <nav className={styles.nav}>
        <Box sx={{ m: 4.7, display: 'flex' }}>
          <Box>
            <Typography className={classes.TypographyHeader}>
              Janeiro
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

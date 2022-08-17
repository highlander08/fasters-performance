import { Box, Modal, Typography } from '@mui/material';
import { format } from 'date-fns';
import React, { useContext } from 'react';
import DatePicker from 'react-datepicker';
import { MyContext } from '../hooks/useContext';
import { useStyles } from '../hooks/useSyles';
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

const ModalNew = () => {
  const classes = useStyles();

  const { setAllEvent, open, setOpen, handleClose, values, setValues } =
    useContext(MyContext);

  const dateFormatAux = (date) => {
    const result = format(date, "MMMM dd ','yyyy");
    return result;
  };

  const dateFormat = (date) => {
    let formatYearMonthDay = dateFormatAux(date);

    return [formatYearMonthDay];
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
              name="title"
            />
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
              name="description"
            />

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
  );
};

export default ModalNew;

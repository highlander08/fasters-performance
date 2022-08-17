
import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, Calendar } from "@material-ui/pickers";
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { ptBR } from "date-fns/locale";
const theme = createTheme ({
  palette: {
    primary: {  main: '#EDF6F6' }
  }
});

export default function CalendarNew() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Date is: ", date);
  };

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
        <Paper style={{ overflow: "hidden", margin: '30px' }}>
          <Calendar date={selectedDate} onChange={handleDateChange} />
        </Paper>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

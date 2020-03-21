import React, { useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { makeStyles, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import grey from '@material-ui/core/colors/grey';

import * as actionCreators from '../../store/actions/index'

const useStyles = makeStyles({
  table: {
    maxWidth: 650,
    border: "1px solid black",
    borderRadius: "10px",
    margin: "0 auto",
    padding: "0.1%",
  },
  today: {
    background: "linear-gradient(to right, #00b4db, #0083b0)",
    color: "white",
  },
  td: {
    cursor: "cell",
    margin: "10%",
    fontSize: "18px",
    textAlign: "center",
    borderRadius: "10px",
    "&:hover": {
      background: "linear-gradient(to right, #f09819, #edde5d)",
    },
  },
  monthYearBox: {
    padding: "1%",
    borderRadius: "10px",
    color: "#ccc",
    background: grey[300]
  },
  icon: {
    fontSize: "38px",
    color: "#00b4db",
    cursor: "pointer"
  },
  box: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  yearMonth: {
    color: " #f09819",
    padding: "0",
    margin: "1%",
  },

  ali: {
    color: "blue"
  }
});

const findFirstDayOfMonth = (currentMonth, currentYear) => Number(moment(`${currentYear}-${currentMonth + 1}`, "YYYY-MM").startOf("month").format("d"));
const findDaysInMonth = (currentMonth, currentYear) => moment(`${currentYear}-${currentMonth + 1}`, "YYYY-MM").daysInMonth()

//? mainData = [currentMonth, currentYear, firstDayOfMonth, daysInMonth]

const Calendar = (props) => {
  const classes = useStyles();

  const [today] = useState(Number(moment().format("D")));
  const [mainData, setNewMainData] = useState([
    moment().month(),
    moment().year(),
    findFirstDayOfMonth(moment().month(), moment().year()),
    findDaysInMonth(moment().month(), moment().year())
  ]);

  let cells = [];
  let groupDays = [];
  let flag = 0;
  for (let day = 0; day < mainData[3]; day++) {
    if (mainData[2] === day && flag === 0) {
      flag = 1;
      day = 0;
    };
    (flag === 1) ? cells.push(day + 1) : cells.push('');
  }

  while (cells.length) {
    groupDays.push(cells.splice(0, 7))
  }

  //? mainData = [currentMonth, currentYear, firstDayOfMonth, daysInMonth]

  const previousMonthHandler = () => {
    let newMainData = mainData.slice();
    if (newMainData[0] - 1 === -1) {
      newMainData[0] = 11;
      newMainData[1] = newMainData[1] - 1
    } else newMainData[0] = newMainData[0] - 1;
    newMainData[2] = findFirstDayOfMonth(newMainData[0], newMainData[1]);
    newMainData[3] = findDaysInMonth(newMainData[0], newMainData[1])
    setNewMainData(newMainData)
  };

  const nextMonthHandler = () => {
    let newMainData = mainData.slice();
    if (newMainData[0] + 1 === 12) {
      newMainData[0] = 0;
      newMainData[1] = newMainData[1] + 1
    } else newMainData[0] = newMainData[0] + 1;
    newMainData[2] = findFirstDayOfMonth(newMainData[0], newMainData[1]);
    newMainData[3] = findDaysInMonth(newMainData[0], newMainData[1])
    setNewMainData(newMainData)
  };

  const previousYearHandler = () => {
    let newMainData = mainData.slice();
    newMainData[1] -= 1;
    newMainData[2] = findFirstDayOfMonth(newMainData[0], newMainData[1]);
    newMainData[3] = findDaysInMonth(newMainData[0], newMainData[1])
    setNewMainData(newMainData)
  }

  const nexYearHandler = () => {
    let newMainData = mainData.slice();
    newMainData[1] += 1;
    newMainData[2] = findFirstDayOfMonth(newMainData[0], newMainData[1]);
    newMainData[3] = findDaysInMonth(newMainData[0], newMainData[1])
    setNewMainData(newMainData)
  };

  const selectDayHandler = (day) => {
    if(typeof day === 'number'){
      console.log(day, typeof day, mainData[0], mainData[1])
      props.onSetSelectDay([day ,mainData[0], mainData[1]])
    } 
  }

  return (
    <TableContainer
      className={classes.table}>
      <Box
        className={classes.monthYearBox}
        display="flex"
        flexWrap="wrap"
        justifyContent="space-around"
        p={1}
        m={1}
        css={{ maxWidth: "100%" }}>
        <Box
          className={classes.box} >
          <NavigateBeforeIcon
            className={classes.icon}
            onClick={previousMonthHandler} />
          <Typography
            className={classes.yearMonth}
            variant="h5"
            gutterBottom>
            {moment().month(mainData[0]).format("MMMM")}
          </Typography>
          <NavigateNextIcon
            className={classes.icon}
            onClick={nextMonthHandler} />
        </Box>
        <Box
          className={classes.box}>
          <NavigateBeforeIcon
            className={classes.icon}
            onClick={previousYearHandler} />
          <Typography
            className={classes.yearMonth}
            variant="h5"
            gutterBottom>
            {mainData[1]}
          </Typography>
          <NavigateNextIcon
            className={classes.icon}
            onClick={nexYearHandler} />
        </Box>
      </Box>
      <Table
        aria-label="Calendar">
        <TableHead>
          <TableRow>
            {moment.weekdays().map(name => (
              <TableCell key={name} >{name}</TableCell >
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {groupDays.map((groupDay, index) => (
            <TableRow key={`${index}groupDays`}>
              {groupDay.map((day, index) => {
                return <TableCell
                  key={`${day}${index}days`}
                  className={`
                    ${(typeof day === 'number') ? classes.td : ''} 
                    ${(today === day && mainData[0] === moment().month() && mainData[1] === moment().year()) ? classes.today : ''}
                    `}
                  onClick={() => selectDayHandler(day)}>
                  {day}
                </TableCell >
              })}
            </TableRow >
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


const mapDispatchToProps = dispatch => {
  return {
    onSetSelectDay: (day) => dispatch(actionCreators.setSelectDay(day))
  }
}

const mapStateToProps = state => {
  console.log('state', state)
  return {
    selectDay: state.slDay.selectedDay
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

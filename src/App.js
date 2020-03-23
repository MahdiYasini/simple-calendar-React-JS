import React from 'react';
import { Box } from '@material-ui/core'
import Calendar from './components/calendar/calendar';
import DayEvent from './components/dayEvent/dayEvent';
import { connect } from 'react-redux';
import './App.css';

function App(props) {
  return (
    <div className="App">
      <Box p={1}>
        <Calendar />
      </Box>
      {(props.selectDay.length) ? <Box p={1}> <DayEvent /> </Box> : '' }
    </div>
  );
}

const mapStateToProps = state => {
  return {
    selectDay: state.slDay.selectedDay
  }
}

export default connect(mapStateToProps, null)(App)
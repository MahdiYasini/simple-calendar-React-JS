import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import { makeStyles, Box, Typography, Modal } from '@material-ui/core';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import cyan from '@material-ui/core/colors/cyan';

import Loader from '../../UI/loader'

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        maxWidth: "100%"
    },
    card: {
        boxShadow: " 0 4px 8px 0 rgba(0,0,0,0.2)",
        transition: " 0.3s",
        width: "40%",
        backgroundColor: cyan[700]
    },
    container: {
        padding: "2px 16px",
    },
    font: {
        color: cyan[50],
    }

}));

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};

const EventDay = (props) => {
    const classes = useStyles();
    const [dayInfo, setDayInfo] = useState([]);
    const [loader, setLoader] = useState(false)

    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setOpen(true);
        setLoader(true);
        let promise1 = axios.get(`https://farsicalendar.com/api/wc/${props.selectDay[0]}/${props.selectDay[1] + 1}?lang=eng%20category=WorldwideHolidays,iran,iran-history,UnitedNations,ShiaDays,WWI,WWII`, { headers: { 'Access-Control-Allow-Origin': '*' } });
        let promise2 = fetch(`https://source.unsplash.com/${(window.innerWidth > 1000) ? 614 : 400}x600/?flower`)

        Promise.all([promise1, promise2])
            .then(responses => {
                (responses[0].data.values.length === 0) ? setDayInfo(["Nothing :)", "Nothing :)", responses[1].url]) : setDayInfo([responses[0].data.values[0].category, responses[0].data.values[0].occasion, responses[1].url]);
                setLoader(false);
            });
    }, [props.selectDay])


    const dayInformation = (
        <>
            <img
                className={classes.image}
                src={dayInfo[2]}
                alt="Flower" />
            <div
                className={classes.container}>
                <Typography
                    className={classes.font}
                    variant="subtitle1"
                    gutterBottom>
                    Category:  {dayInfo[0]}
                </Typography>
                <Typography
                    className={classes.font}
                    variant="subtitle1"
                    gutterBottom>
                    Event: {dayInfo[1]}
                </Typography>
            </div>
        </>
    )

    return (
        <div>
            <Modal
                aria-labelledby="Day-Info"
                aria-describedby="Day-Info"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade
                    className={classes.card}
                    in={open}>
                    {(loader) ? <Loader /> : dayInformation}
                </Fade>
            </Modal>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        selectDay: state.slDay.selectedDay
    }
}

export default connect(mapStateToProps, null)(EventDay)
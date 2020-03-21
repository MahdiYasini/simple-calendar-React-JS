import * as actionTypes from './actionTypes';

export const setSelectDay = (selectDay) => {
    return {
        type: actionTypes.SELECT_DAY,
        selectDay: selectDay
    }
};
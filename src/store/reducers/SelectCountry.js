import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    selectDay: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SELECT_DAY:
                return updateObject(state, {day: action.day})
        default:
            return state;
    }
};

export default reducer;
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    selectedDay: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SELECT_DAY:
                return updateObject(state, {selectedDay: action.selectDay})
        default:
            return state;
    }
};

export default reducer;
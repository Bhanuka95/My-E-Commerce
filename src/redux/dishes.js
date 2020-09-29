import * as ActionTypes from './ActionTypes';

//if the state is undefined, you give the default value as the Dishes as imported above
export const Dishes = (state = {
    isLoading: true,
    errMess: null,
    dishes: []
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_DISHES:
            return{...state, isLoading: false, errMess: null, dishes: action.payload}

        case ActionTypes.DISHES_LOADING:
            return{...state, isLoading: true, errMess: null, dishes: []}

        case ActionTypes.DISHES_FAILED:
            return{...state, isLoading: false, errMess: action.payload, dishes: []}
            
        default:
            return state;
    }
}
import { _getUsers, _getQuestions } from '../utils/_DATA'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { showLoading, hideLoading } from 'react-redux-loading'
import { setAuthedUser } from '../actions/login'

let usersPromise = _getUsers();
let quesPromise = _getQuestions();

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return Promise.all([usersPromise, quesPromise]).then((values) => {
            dispatch(receiveUsers(values[0]))
            dispatch(receiveQuestions(values[1]))
            dispatch(hideLoading())
        });
    }
}